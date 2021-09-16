import React, { useState, createContext } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { signInService, signOutService } from '../../services';

import { IAuth, IAuthUserContext, IAuthUserProvider, IUser } from './type';

export const AuthUserContext = createContext({} as IAuthUserContext);

export const AuthUserProvider = ({ children }: IAuthUserProvider) => {
  const history = useHistory();
  const [auth, setAuth] = useState<IUser>({
    name: window.localStorage.getItem('@agenda:name'),
    email: window.localStorage.getItem('@agenda:email'),
  });

  function removeItemToLocalStorage() {
    window.localStorage.removeItem('@agenda:name');
    window.localStorage.removeItem('@agenda:email');
  }

  async function handleSignIn({ email, password }: IAuth) {
    try {
      removeItemToLocalStorage();
      const response = await signInService(email, password);
      if (response) {
        setAuth({
          name: response.name,
          email: response.email,
        });
        handleSetUserInfo(response.name, response.email);
      }
    } catch (error) {
      toast.error('Usuário ou senha incorretos!', {
        position: 'top-right',
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      history.push('/login');
    }
  }

  async function handleSignOut() {
    try {
      await signOutService();
      setAuth({
        name: '',
        email: '',
      });
      removeItemToLocalStorage();
    } catch (error) {
      toast.error('Serviço não disponível no momento, por favor aguarde!', {
        position: 'top-right',
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  function handleSetUserInfo(name: string, email: string) {
    window.localStorage.setItem('@agenda:name', `${name}`);
    window.localStorage.setItem('@agenda:email', `${email}`);
  }

  return (
    <AuthUserContext.Provider value={{ auth, handleSignIn, handleSignOut }}>
      {children}
    </AuthUserContext.Provider>
  );
};
