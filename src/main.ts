import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  if (process.env.ENV === 'local') {
    logger.debug(`env: ${process.env.ENV}`);

    app.enableCors({ origin: 'http://localhost:4200', credentials: true });
  }

  await app.listen(3000);
}
bootstrap();
