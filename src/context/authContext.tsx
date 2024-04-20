import { createContext, FC, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithCustomToken, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { AuthContextProviderProps } from '../../types/context/authContext';
import { AuthenticationContext, CreateNewUser, User } from '../../types/authentication';
import { Callable } from '../../enums/callable';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { auth } from '../config/firebaseConfig';

const defaultContext: AuthenticationContext = {
  signUp: async () => {
    throw new Error('Should be implemented in AuthContextProvider.');
  },
  login: async () => {
    throw new Error('Should be implemented in AuthContextProvider.');
  },
  logOut: async () => {
    throw new Error('Should be implemented in AuthContextProvider.');
  },
  loading: true,
  isUserLoggedIn: false
};

const AuthContext = createContext<AuthenticationContext>(defaultContext);

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider: FC<AuthContextProviderProps> = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsUserLoggedIn(!!user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signUp = async (data: CreateNewUser) => {
    try {
      const functions = getFunctions();
      const createUser = httpsCallable<CreateNewUser, User>(
        functions,
        Callable.CreateUser
      );
      const result = await createUser(data);
      const { jwtToken } = result.data;

      await signInWithCustomToken(auth, jwtToken);
      setIsUserLoggedIn(true);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error during sign up or sign in:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => await signOut(auth);

  return (
    <AuthContext.Provider value={{ logOut, signUp, login, loading, isUserLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
