import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { resolve } from 'path';
import { AppModule } from './modules/main/app.module';

// TODO: move to configs
const PUBLIC_PATH = resolve('.', 'client/dist/public');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(PUBLIC_PATH, {
    prefix: '/public',
    index: false,
    redirect: false,
  });

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
