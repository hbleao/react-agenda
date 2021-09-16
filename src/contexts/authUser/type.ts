export type IAuthUserProvider = {
  children: React.ReactNode;
};

export type IUser = {
  name: string | null;
  email: string | null;
};

export type IAuth = {
  email: string;
  password: string;
};

export type IAuthUserContext = {
  auth: IUser;
  handleSignIn: (user: IAuth) => Promise<void>;
  handleSignOut: () => Promise<void>;
};
