import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe());

   const options = new DocumentBuilder()
     .setTitle('Cute Cat Server')
     .setDescription('The cats API description')
     .setVersion('0.1')
     .addTag('cats')
     .build();

   const document = SwaggerModule.createDocument(app, options);
   SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
