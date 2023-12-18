import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { List } from '../List';
import { Item } from '../Item';

import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';

export function App() {
    return (
        <Router>
            <Route path='/' component={List} />
            <Route path='/:id' component={Item} />
        </Router>
    );
}