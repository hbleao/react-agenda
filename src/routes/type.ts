import { ComponentType } from 'react';

export type PrivateRouteProps = {
  component: ComponentType<any>;
  path?: string;
  exact?: boolean;
};
