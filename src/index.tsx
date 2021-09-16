import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';

import { Routes } from './routes';

import 'react-toastify/dist/ReactToastify.css';
import './style/global.css';

import { AuthUserProvider } from './contexts/authUser';

ReactDOM.render(
  <React.StrictMode>
    <AuthUserProvider>
      <Routes />
      <ToastContainer />
    </AuthUserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
