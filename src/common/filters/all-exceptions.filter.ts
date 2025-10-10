import {ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger} from '@nestjs/common';
import type {Response} from "express";

@Catch()
export class AllExceptionsFilter<T> implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    catch(exception: T, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse() as Response
        const status = exception instanceof HttpException ? exception.getStatus() : 500
        const message = exception instanceof HttpException ? exception.message : 'Internal server error'
        this.logger.error(message, exception)

        response.status(status).json(
            {
                statusCode: status,
                message: message,
                timestamp: new Date().toISOString(),
                path: ctx.getRequest().url,
            }
        )
    }
}
