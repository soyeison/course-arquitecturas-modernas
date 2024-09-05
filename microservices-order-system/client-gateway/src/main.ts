import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, RequestMethod } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Main-Gateway');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api', {
    exclude: [
      {
        path: '',
        method: RequestMethod.GET,
      },
    ],
  });

  await app.listen(3000);

  console.log('Health Check configured');
  logger.log(`Gateway running on port ${3000}`);
}
bootstrap();
