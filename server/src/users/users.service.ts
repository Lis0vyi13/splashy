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

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly supabase: SupabaseService,
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

    return publicData.publicUrl;
  }

  async getUserById(userId: string) {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }
}
