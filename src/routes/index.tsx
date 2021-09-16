import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Calendar } from '../pages/Calendar';
import { LoginPage } from '../pages/Login';

import { PrivateRoute } from './privateRoute';

export function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/calendar/:month" component={Calendar} />
        <Route path="/login" component={LoginPage} />
        <Route path="/" exact component={LoginPage} />
      </Switch>
    </BrowserRouter>
  );
}
