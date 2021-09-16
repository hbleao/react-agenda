import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

import { PrivateRouteProps } from './type';

export const PrivateRoute = ({
  component: Component,
  path,
  exact,
}: PrivateRouteProps) => {
  const { auth } = useAuth();

  return auth.name ? (
    <Route path={path} exact={exact} component={Component} />
  ) : (
    <Redirect to="/login" />
  );
};
