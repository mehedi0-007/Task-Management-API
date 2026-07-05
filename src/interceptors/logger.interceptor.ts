import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggerInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();

    const method = request.method;
    const url = request.originalUrl;

    const start = Date.now();

    this.logger.log(`--->${method} ${url}`);

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start;

        this.logger.log(`<---${method} ${url} (${duration}ms)`);
      }),
    );
  }
}
