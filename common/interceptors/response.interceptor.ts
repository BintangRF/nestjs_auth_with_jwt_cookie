import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    const response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((res: { data?: T; meta?: T } | T) => {
        // response berupa object dengan response data dan meta
        if (
          res &&
          typeof res === 'object' &&
          ('data' in res || 'meta' in res)
        ) {
          const { meta, data } = res;

          return {
            statusCode: response.statusCode,
            message: 'success',
            data,
            ...(meta ? { meta } : {}),
          };
        }

        return {
          statusCode: response.statusCode,
          message: 'success',
          data: res,
        };
      }),
    );
  }
}
