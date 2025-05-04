import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
    cors: { methods: ['GET', 'POST', 'PUT', 'DELETE'], credentials: true },
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 5003, () => {
    console.log(`Server is running on port ${process.env.PORT ?? 5003}`);
  });
}

bootstrap().catch((error) => {
  console.error('Failed to start application:', error);
  process.exit(1);
});
