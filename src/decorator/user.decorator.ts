import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/interfaces/user.interface';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (request?.user == null) return null;
    return request.user as User;
  },
);
