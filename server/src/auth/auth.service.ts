import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { SignUpRequest } from './dto/sign-up.dto';
import type { LoginRequest } from './dto/login.dto';
import { AuthUtils } from './utils/auth.utils';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import type { Response, Request } from 'express';
import { isDev } from 'src/utils/is-dev.utils';
import { JwtPayload } from './types/jwt.interface';

@Injectable()
export class AuthService {
  private readonly refreshTokenExpiry: string;
  private readonly COOKIE_DOMAIN: string;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.refreshTokenExpiry = this.configService.getOrThrow<string>(
      'JWT_REFRESH_TOKEN_EXPIRATION',
    );
    this.COOKIE_DOMAIN = this.configService.getOrThrow<string>('COOKIE_DOMAIN');
  }

  async signup(res: Response, dto: SignUpRequest) {
    const { email, name, password, rememberMe } = dto;

    const existingUser = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const username = await AuthUtils.generateUniqueUsername(
      this.prismaService,
      email,
    );

    const user = await this.prismaService.user.create({
      data: {
        email,
        name,
        password: await hash(password),
        username,
      },
    });

    return this.auth(res, user.id, rememberMe);
  }

  async login(res: Response, dto: LoginRequest) {
    const { email, password, rememberMe } = dto;

    const user = await this.prismaService.user.findUnique({
      where: { email },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User with this email does not exist');
    }

    const isPasswordValid = await verify(user.password, password);

    if (!isPasswordValid) {
      throw new NotFoundException('Invalid email or password');
    }

    return this.auth(res, user.id, rememberMe);
  }

  async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies['refreshToken'] as string;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const payload: JwtPayload = await this.jwtService.verifyAsync(refreshToken);

    if (!payload) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.prismaService.user.findUnique({
      where: { id: payload.userId },
      select: { id: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.auth(res, user.id, payload.rememberMe);
  }

  logout(res: Response) {
    this.setCookie(res, 'refreshToken', new Date(0));
  }

  async validate(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  private auth(res: Response, userId: string, rememberMe = false) {
    const { accessToken, refreshToken } = this.generateTokens(
      userId,
      rememberMe,
    );

    const expiry = rememberMe
      ? new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
      : new Date(Date.now() + 1000 * 60 * 60 * 24);

    this.setCookie(res, refreshToken, expiry);

    return { accessToken };
  }

  private generateTokens(userId: string, rememberMe = false) {
    const payload: JwtPayload = { userId, rememberMe };

    const accessToken = this.jwtService.sign(payload);

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: rememberMe ? this.refreshTokenExpiry : '1d',
    });

    return { accessToken, refreshToken };
  }

  private setCookie(res: Response, value: string, expires: Date) {
    res.cookie('refreshToken', value, {
      httpOnly: true,
      domain: this.COOKIE_DOMAIN,
      expires,
      secure: !isDev(this.configService),
      sameSite: isDev(this.configService) ? 'lax' : 'none',
    });
  }
}
