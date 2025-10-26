import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { SupabaseService } from 'src/supabase/supabase.service';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { UpdateEmailDto } from './dto/update-email.dto';
import * as crypto from 'crypto';
import { MailService } from 'src/mail/mail.service';
import { ConfirmEmailDto } from './dto/confirm-email.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly supabase: SupabaseService,
    private readonly mailService: MailService,
  ) {}

  async updateMe(userId: string, data: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) throw new NotFoundException('User not found');

    if (data.username && data.username !== user.username) {
      const existingUser = await this.prisma.user.findUnique({
        where: { username: data.username },
      });

      if (existingUser) {
        throw new BadRequestException('Username is already taken');
      }
    }

    return this.prisma.user.update({
      where: { id: userId },
      data,
    });
  }

  async uploadAvatar(userId: string, file: Express.Multer.File) {
    const fileName = `${uuidv4()}${path.extname(file.originalname)}`;

    const { data, error } = await this.supabase.supabaseClient.storage
      .from('avatars')
      .upload(`avatars/${fileName}`, file.buffer, {
        cacheControl: '3600',
        upsert: true,
        contentType: file.mimetype,
      });

    if (error) {
      if (error.message.includes('fetch failed')) {
        throw new InternalServerErrorException(
          'Failed to connect to Supabase. Check the URL or Internet access on the server.',
        );
      }

      throw new BadRequestException(`File upload failed: ${error.message}`);
    }

    const { data: publicData } = this.supabase.supabaseClient.storage
      .from('avatars')
      .getPublicUrl(data.path);

    await this.prisma.user.update({
      where: { id: userId },
      data: { avatar: publicData.publicUrl },
    });

    return { url: publicData.publicUrl };
  }

  async getUserById(userId: string) {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  async requestEmailChange(userId: string, dto: UpdateEmailDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const emailTaken = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (emailTaken) throw new BadRequestException('Email already in use');

    const token = crypto.randomBytes(32).toString('hex');

    await this.prisma.user.update({
      where: { id: userId },
      data: { pendingEmail: dto.email, emailToken: token },
    });

    await this.mailService.sendEmailChange(user.email, dto.email, token);

    return { message: `Confirmation email sent to ${dto.email}` };
  }

  async confirmEmailChange(dto: ConfirmEmailDto) {
    const user = await this.prisma.user.findFirst({
      where: { emailToken: dto.token },
    });
    if (!user) throw new BadRequestException('Invalid or expired token');

    if (!user.pendingEmail) {
      throw new BadRequestException('No pending email to confirm');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        email: user.pendingEmail,
        pendingEmail: null,
        emailToken: null,
      },
    });

    return { message: 'Email updated successfully' };
  }
}
