import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { logger } from './logger';
import { config } from './config';
import { LoggingErrorInterceptor } from './middleware/loggingError.interceptor';
import { HttpExceptionFilter } from './middleware/httpException.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(config.BASE_PATH);

  /** Config Swagger */
  const options = new DocumentBuilder()
    .setTitle('Api document')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(config.SWAGGER_PATH, app, document, {
    explorer: true,
    swaggerOptions: {
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
    },
  });

  app.useGlobalInterceptors(new LoggingErrorInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();
  // enable cors
  app.enableCors({ origin: true });
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization,If-None-Match,Accept-language,api-key');
    next();
  });

  const port = config.PORT;
  await app.listen(config.PORT, () => {
    logger.info(`app listen port: ${port}`);
    logger.info(`view swagger http://localhost:${port}${config.SWAGGER_PATH}`);
    console.log(`view swagger http://localhost:${port}${config.SWAGGER_PATH}`);
  });
}
bootstrap();
