import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { User } from 'generated/prisma';

interface AuthenticatedRequest extends Request {
  user?: User;
  params: {
    id: string;
  };
}

@Injectable()
export class OwnerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = request.user;
    const paramId = request.params.id;

    if (!user) {
      throw new ForbiddenException('Not authorized');
    }

    if (user.id !== paramId) {
      throw new ForbiddenException('You can only modify your own account');
    }

    return true;
  }
}
