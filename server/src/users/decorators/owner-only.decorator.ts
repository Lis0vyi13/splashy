import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/auth.guard';
import { OwnerGuard } from '../guards/owner.guard';

export function OwnerOnly() {
  return applyDecorators(UseGuards(JwtGuard, OwnerGuard));
}
