import { createParamDecorator } from '@nestjs/common';

export const AuthUserDecorator = createParamDecorator((data, req) => {
  return req.switchToHttp().getRequest().user;
});