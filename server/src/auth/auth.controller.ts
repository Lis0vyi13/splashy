import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { type SignUpRequest } from './dto/sign-up.dto';
import { type LoginRequest } from './dto/login.dto';
import type { Response, Request } from 'express';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthResponse } from './dto/auth.dto';
import { Authorization } from './decorators/authorization.decorator';
import { Authorized } from './decorators/authorized.decorator';
import type { User } from 'generated/prisma';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Register a new user',
  })
  @ApiOkResponse({ type: AuthResponse })
  @ApiConflictResponse({ description: 'User with this email already exists' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: SignUpRequest,
  ) {
    return this.authService.signup(res, dto);
  }

  @ApiOperation({
    summary: 'Login user',
  })
  @ApiOkResponse({ type: AuthResponse })
  @ApiConflictResponse({ description: 'User with this email already exists' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginRequest,
  ) {
    return this.authService.login(res, dto);
  }

  @Authorization()
  @Get('me')
  @HttpCode(HttpStatus.OK)
  me(@Authorized() user: User) {
    return user;
  }

  @ApiOperation({
    summary: 'Refresh access token',
  })
  @ApiOkResponse({ type: AuthResponse })
  @ApiUnauthorizedResponse({ description: 'Invalid or expired refresh token' })
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refresh(req, res);
  }

  @ApiOperation({
    summary: 'Logout user',
  })
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }
}
