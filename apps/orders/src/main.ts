import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule);
  app.useGlobalPipes(new ValidationPipe())
  const configService = app.get(ConfigService)
  Logger.log("Listening to port " + configService.get("3000"))
  await app.listen(configService.get("PORT"));
}
bootstrap();
