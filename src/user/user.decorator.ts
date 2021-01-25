import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const UserDec = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user.id;
    //   return data ? req.user[data] : req.user;
  },
);
