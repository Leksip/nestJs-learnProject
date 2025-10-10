import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import {map, Observable} from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    const request = context.switchToHttp().getRequest();
    const status = response.statusCode;
    const method = request.method;
    return next.handle().pipe(
        map(data => ({
          status,
          method,
          data
        })),
    );
  }
}
