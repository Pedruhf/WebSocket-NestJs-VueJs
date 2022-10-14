import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GenericExpectionFilter } from './utils/exception-filters/generic.exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: false,
  })
  app.useGlobalFilters(new GenericExpectionFilter());

  const swaggerOptions = new DocumentBuilder()
    .setTitle('NestJS Rooms API')
    .setVersion('0.1.0')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api/swagger', app, swaggerDocument);

  await app.listen(3000);
}
bootstrap();
