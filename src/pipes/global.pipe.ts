import {ValidationPipe,} from '@nestjs/common';

export const globalValidationPipe = (): ValidationPipe => (
  new ValidationPipe({
    // disableErrorMessages: true,
    whitelist: true,
  })
);
