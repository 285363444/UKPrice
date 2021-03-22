
//import React from 'react';

import Home from '../views/home';
import Login from '../views/login';

const routes = [
  {
    path: '/',
    component: Login,
    exact: true,
  },
  {
    path: '/home',
    component: Home,
    exact: true,
  },
];

export { routes }
