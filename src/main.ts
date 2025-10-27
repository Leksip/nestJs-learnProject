import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {ResponseInterceptor} from "./common/interceptors/response.interceptor";
import {AllExceptionsFilter} from "./common/filters/all-exceptions.filter";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {MovieModule} from "./movie/movie.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe()); // Устанавливаем глобальную валидацию
    app.useGlobalInterceptors(new ResponseInterceptor)
    app.setGlobalPrefix('api');
    app.useGlobalFilters(new AllExceptionsFilter())

    const swaggerConfig = new DocumentBuilder()
        .setTitle('Nest API')
        .setDescription('The nest API description')
        .setContact('Nikita Chicherin', '', 'nickita.rom@gmail.com')
        .addBearerAuth()
        .setVersion('1.0.0').build();

    const document = SwaggerModule.createDocument(app, swaggerConfig,{
        include: [AppModule, MovieModule],
        // deepScanRoutes: true,
    });

    SwaggerModule.setup('api/docs', app, document,{
        jsonDocumentUrl: '/api/docs.json',
        customSiteTitle: 'Nest API Docs',
    });

    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
