import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { LedMatrixService } from './led-matrix/led-matrix.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly ledMatrixService: LedMatrixService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  async postText(@Body() text: string): Promise<void> {
    await this.ledMatrixService.text(text);
  }
}
