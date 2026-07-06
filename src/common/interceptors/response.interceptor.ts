import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map } from 'rxjs/operators';

interface Response {
  message: string;
  data: object;
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((value: Response) => ({
        success: true,
        message: value.message ?? '',
        data: value.data ?? value,
      })),
    );
  }
}
