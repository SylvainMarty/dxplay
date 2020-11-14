import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LedMatrixService } from './led-matrix/led-matrix.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, LedMatrixService],
})
export class AppModule {}
