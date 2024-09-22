import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { globalValidationPipe } from './pipes/global.pipe';
import { initSwaggerSetup } from './utils/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(globalValidationPipe());
  initSwaggerSetup(app);
  await app.listen(3000);
}
bootstrap();
