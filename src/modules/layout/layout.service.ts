import { Injectable } from '@nestjs/common';
import { createRenderFunction } from '@gravity-ui/app-layout';

const renderLayout = createRenderFunction();
@Injectable()
export class LayoutService {
  getLayout(): string {
    return renderLayout({
      title: 'Fature flags',
      scripts: [{ src: '/public/bundle.js', defer: true }],
    });
  }
}
