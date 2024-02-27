import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const port = process.env.APP_PORT || 5000;
  const isProduction = process.env.NODE_ENV === 'production';
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      ...(isProduction && {
        disableErrorMessages: true,
        forbidNonWhitelisted: true,
      }),
    }),
  );
  app.useGlobalFilters();
  if (!isProduction) {
    const config = new DocumentBuilder()
      .setTitle('The Test')
      .setDescription('Test API notes')
      .setVersion('1.0')
      .addTag('tests')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }
  app.use(cookieParser());
  app.enableCors();
  await app.listen(port);
  Logger.log(`🚀 Server running on ${await app.getUrl()}`, 'Bootstrap');
}
bootstrap();
