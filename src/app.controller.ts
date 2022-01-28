import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/shortn')
  getShortenUrl(@Query('q')	q: string): string {
    return this.appService.getShortenUrl(q);
  }

  @Get('/shortn/:hash')
  getTranslation(@Param('hash')	hash: string): string {
    const translated = this.appService.translate(hash);
    return translated;
  }
}
