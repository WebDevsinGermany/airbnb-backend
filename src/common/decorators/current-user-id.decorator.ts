import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

export const CurrentUserId = createParamDecorator(
  (_: never, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const user: User = request.user;

    return user.user_id;
  },
);
