import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = parseInt(process.env.PORT) || 3000;
  console.log(process.env.PORT);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
bootstrap();
