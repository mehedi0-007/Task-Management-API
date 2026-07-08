import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      message: 'Service is running',
      data: null,
    };
  }

  getUrl() {
    return {
      message: 'Welcome to Task Management API system',
      data: null,
    };
  }
}
