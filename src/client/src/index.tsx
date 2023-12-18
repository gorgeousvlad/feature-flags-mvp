import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@gravity-ui/uikit';

import { App } from './components/App'

const domNode = document.getElementById('root');

if (domNode) {
    const root = createRoot(domNode);

    root.render(<ThemeProvider theme="dark"><App /></ThemeProvider>)
}
