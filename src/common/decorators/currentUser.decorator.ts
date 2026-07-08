import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedRequest } from '../interfaces/authenticated_req.interface.';

export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext): any => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = request.user;
    if (data.length > 0) {
      return user?.[data];
    }
    return user;
  },
);
