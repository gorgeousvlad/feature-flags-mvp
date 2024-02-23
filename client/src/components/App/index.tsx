import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { List } from '../List';
import { Item } from '../Item';

import { useServices } from '../../hooks/useServices';
import { ServicesContext } from '../../context/services';

import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';


export function App() {
    const servicesData = useServices();

    return (
        <ServicesContext.Provider value={servicesData}>
        <Router>
            <Route path='/' component={List} exact />
            <Route path='/:id' component={Item} exact />
        </Router>
        </ServicesContext.Provider>
    );
}