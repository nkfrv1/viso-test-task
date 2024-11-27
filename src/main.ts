import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggerInterceptor } from './common/logger.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: { enableImplicitConversion: true },
        }),
    );

    app.useGlobalInterceptors(new LoggerInterceptor());

    const configService = app.get(ConfigService);
    app.enableCors();

    const config = new DocumentBuilder()
        .setTitle('Viso Test Task API')
        .setVersion('1.0')
        .build();
    const options = {
        operationIdFactory: (controllerKey: string, methodKey: string) =>
            methodKey,
    };
    const document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup('api-docs', app, document);

    await app.listen(+configService.get('PORT') || 3000);
}

bootstrap();
