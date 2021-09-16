import { baseURL } from '../api';

import { handleResponse, handleBodyRequest } from '../../helpers';

import { IResponseUser } from './type';

export async function getUserService(): Promise<IResponseUser> {
  const httpResultAuthorization = await fetch(`${baseURL}/auth/user`, {});
  return handleResponse(httpResultAuthorization);
}

export async function signInService(
  email: string,
  password: string
): Promise<IResponseUser> {
  const httpResultAuthorization = await fetch(
    `${baseURL}/auth/login`,
    handleBodyRequest('POST', { email, password })
  );
  return handleResponse(httpResultAuthorization);
}

export async function signOutService(): Promise<void> {
  const httpResultAuthorization = await fetch(`${baseURL}/auth/logout`, {
    credentials: 'include',
    method: 'POST',
  });
  return handleResponse(httpResultAuthorization);
}
