import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Interface } from 'readline';
import { map } from 'rxjs/operators';

interface Response {
  message: string;
  data: any;
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data: Response) => ({
        success: true,
        message: data.message ?? '',
        data: data.data ?? data,
      })),
    );
  }
}
