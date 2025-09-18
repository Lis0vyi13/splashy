import {
  createParamDecorator,
  UnauthorizedException,
  type ExecutionContext,
} from '@nestjs/common';
import type { Request } from 'express';
import type { User } from 'generated/prisma';

export const Authorized = createParamDecorator(
  (key?: keyof User, ctx?: ExecutionContext): any => {
    const request = ctx?.switchToHttp().getRequest<Request>();
    const user = request?.user as User | undefined;

    if (!user) {
      throw new UnauthorizedException('Not authorized');
    }

    return key ? user[key] : user;
  },
);
