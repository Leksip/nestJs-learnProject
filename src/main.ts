import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {ResponseInterceptor} from "./common/interceptors/response.interceptor";
import {AllExceptionsFilter} from "./common/filters/all-exceptions.filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe()); // Устанавливаем глобальную валидацию
    app.useGlobalInterceptors(new ResponseInterceptor)
    app.setGlobalPrefix('api');
    app.useGlobalFilters(new AllExceptionsFilter())

    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
