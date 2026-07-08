import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      message: 'Service is running',
      data: null,
    };
  }
}
