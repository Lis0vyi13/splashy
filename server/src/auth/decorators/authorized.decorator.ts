import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { User } from 'generated/prisma';

export const Authorized = createParamDecorator(
  (keys?: keyof User | (keyof User)[], ctx?: ExecutionContext): unknown => {
    const request = ctx?.switchToHttp().getRequest<Request>();
    const user = request?.user as User | undefined;

    if (!user) {
      throw new UnauthorizedException('Not authorized');
    }

    const userWithoutPassword: Partial<User> = { ...user };
    delete userWithoutPassword.password;

    if (!keys) return userWithoutPassword;

    if (Array.isArray(keys)) {
      const selectedFields = {} as Partial<Record<keyof User, unknown>>;

      for (const key of keys) {
        selectedFields[key] = userWithoutPassword[key];
      }

      return selectedFields;
    }

    return userWithoutPassword[keys];
  },
);
