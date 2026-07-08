import { Controller, Get } from '@nestjs/common';
import { AppService } from '../service/app.service.js';
import { Public } from '../../../common/decorators/public.decorator.js';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Check service health',
  })
  @Get('/health')
  @Public()
  getHealth() {
    return this.appService.getHealth();
  }

  @Get()
  @Public()
  mainUrl() {
    return this.appService.getUrl();
  }
}
