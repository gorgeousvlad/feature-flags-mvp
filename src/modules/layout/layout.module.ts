import { Module } from '@nestjs/common';
import { LayoutController } from './layout.controller';
import { LayoutService } from './layout.service';

@Module({
  imports: [],
  controllers: [LayoutController],
  providers: [LayoutService],
})
export class LayoutModule {}
