import { Controller, Get } from '@nestjs/common';
import { LayoutService } from './layout.service';

@Controller('*')
export class LayoutController {
  constructor(private readonly appService: LayoutService) {}

  @Get()
  getLayout(): string {
    return this.appService.getLayout();
  }
}
