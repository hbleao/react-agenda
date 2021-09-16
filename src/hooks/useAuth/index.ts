import { useContext } from 'react';

import { AuthUserContext } from '../../contexts/authUser';

export function useAuth() {
  const context = useContext(AuthUserContext);

  const { auth, handleSignIn, handleSignOut } = context;

  return {
    auth,
    handleSignIn,
    handleSignOut,
  };
}
