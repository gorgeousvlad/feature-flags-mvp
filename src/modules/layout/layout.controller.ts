import { Controller, Get } from '@nestjs/common';
import { LayoutService } from './layout.service';

@Controller({
  path: '/',
})
export class LayoutController {
  constructor(private readonly layoutService: LayoutService) {}

  @Get('*')
  getLayout(): string {
    console.log('getLayout');
    return this.layoutService.getLayout();
  }
}
