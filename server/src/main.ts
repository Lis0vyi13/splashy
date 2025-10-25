import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { setupSwagger } from './utils/swagger.utils';
import { ConfigService } from '@nestjs/config';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const frontendDevUrl = configService.get<string>('FRONTEND_DEV_URL');
  const nodeEnv = configService.get<string>('NODE_ENV');
  const frontendProdUrl = configService.get<string>('FRONTEND_PROD_URL');

  const origin = nodeEnv === 'development' ? frontendDevUrl : frontendProdUrl;

  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));

  app.enableCors({ origin, credentials: true });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  setupSwagger(app);

  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);
  console.log(`Server running on port ${port}`);
}

bootstrap().catch((err) => {
  console.error('Bootstrap error:', err);
  process.exit(1);
});
