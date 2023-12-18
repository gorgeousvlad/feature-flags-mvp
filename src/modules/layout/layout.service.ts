import { Injectable } from '@nestjs/common';
import { createRenderFunction } from '@gravity-ui/app-layout';

const renderLayout = createRenderFunction();

@Injectable()
export class LayoutService {
  getLayout(): string {
    return renderLayout({
      title: 'Home page',
      bodyContent: {
        root: 'App layout',
      },
      scripts: [{ src: '/index.js' }],
    });
  }
}
