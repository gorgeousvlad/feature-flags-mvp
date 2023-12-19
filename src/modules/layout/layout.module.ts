import { Module } from '@nestjs/common';
import { LayoutController } from './layout.controller';
import { LayoutService } from './layout.service';

@Module({
  imports: [],
  providers: [LayoutService],
  controllers: [LayoutController],
})
export class LayoutModule {}
