import {
  Controller,
  Patch,
  Body,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'generated/prisma';
import { Authorization } from 'src/auth/decorators/authorization.decorator';
import { Authorized } from 'src/auth/decorators/authorized.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Authorization()
  @Patch('me')
  @HttpCode(HttpStatus.OK)
  async updateMe(
    @Authorized('id') userId: string,
    @Body() dto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateMe(userId, dto);
  }

  @Authorization()
  @Post('upload-avatar')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 2 * 1024 * 1024 },
      fileFilter: (_, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
          return cb(new Error('Only images are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadAvatar(
    @Authorized('id') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const avatarUrl = await this.usersService.uploadAvatar(userId, file);
    return { url: avatarUrl };
  }
}
