import { createContext, FC, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { AuthContextProviderProps } from '../../types/context/authContext';
import {
  AuthenticationContext,
  CreateNewUser,
  User,
} from '../../types/authentication';
import { Callable } from '../../enums/callable';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { auth } from '../../config/firebaseConfig';
import { UserAppDataDTO } from '../../types/dto/user';

const defaultContext: AuthenticationContext = {
  user: null,
  loading: true,
  signUp: async () => {
    throw new Error('Should be implemented in AuthContextProvider.');
  },
  login: async () => {
    throw new Error('Should be implemented in AuthContextProvider.');
  },
  logOut: async () => {
    throw new Error('Should be implemented in AuthContextProvider.');
  },
};

const AuthContext = createContext<AuthenticationContext>(defaultContext);

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider: FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        const jwtToken = await user.getIdTokenResult();

        const functions = getFunctions();
        const getUserAppDataById = httpsCallable<
          { uid: string },
          UserAppDataDTO
        >(functions, Callable.GetUserAppDataById);
        const result = await getUserAppDataById({ uid });
        const { band, events } = result.data;

        setUser({
          uid,
          email: email!,
          name: displayName!,
          jwtToken: jwtToken.token,
          role: jwtToken.claims.role as string,
          band,
          events,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
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
    <AuthContext.Provider value={{ logOut, signUp, login, loading, user }}>
      {children}
    </AuthContext.Provider>
  );
};
