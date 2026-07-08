import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';
import { Prisma } from '@prisma/client';

@Catch()
export class GlobalExeptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';
    console.error(exception);

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2025':
          status = HttpStatus.NOT_FOUND;
          message = 'Resource not found';
          break;

        case 'P2002':
          status = HttpStatus.CONFLICT;
          message = 'Duplicate resource found';
          break;
      }
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();

      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null &&
        'message' in exceptionResponse
      ) {
        const msg = exceptionResponse.message;

        message = Array.isArray(msg) ? msg.join(', ') : (msg as string);
      }
    }

    console.log(message);

    response.status(status).json({
      success: false,
      message: message,
      data: null,
    });
  }
}
