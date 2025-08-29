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
    return next.handle().pipe(
      map((res: any) => {
        // response berupa object dengan response data dan meta
        if (
          res &&
          typeof res === 'object' &&
          ('data' in res || 'meta' in res)
        ) {
          const { meta, data } = res;

          return {
            statusCode: 200,
            message: 'success',
            data,
            ...(meta ? { meta: meta } : {}),
          };
        }

        return {
          statusCode: 200,
          message: 'success',
          data: res,
        };
      }),
    );
  }
}
