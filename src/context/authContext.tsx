import { createContext, FC, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import {
  AuthContextProviderProps,
  AuthenticationContext
} from '../../types/context/authContext';
import { CreateNewUser, User } from '../../types/authentication';
import { Callable } from '../../enums/callable';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { auth } from '../../config/firebaseConfig';
import { UserAppDataDTO } from '../../types/dto/user';
import { Member } from '../../types/member';
import { Event } from '../../types/event';
import { Alert } from '../../types/app';

const defaultContext: AuthenticationContext = {
  user: null,
  loading: true,
  error: null,
  setError: () => {
    throw new Error('Should be implemented in AuthContextProvider.');
  },
  setLoading: () => {
    throw new Error('Should be implemented in AuthContextProvider.');
  },
  signUp: async () => {
    throw new Error('Should be implemented in AuthContextProvider.');
  },
  login: async () => {
    throw new Error('Should be implemented in AuthContextProvider.');
  },
  logOut: async () => {
    throw new Error('Should be implemented in AuthContextProvider.');
  },
  addMemberToBand: () => {
    throw new Error('Should be implemented in AuthContextProvider.');
  },
  addEventToUser: () => {
    throw new Error('Should be implemented in AuthContextProvider.');
  },
  updateEvent: () => {
    throw new Error('Should be implemented in AuthContextProvider.');
  }
};

const AuthContext = createContext<AuthenticationContext>(defaultContext);

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider: FC<AuthContextProviderProps> = ({
                                                                    children
                                                                  }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Alert | null>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        const jwtToken = await user.getIdTokenResult();

        const functions = getFunctions();
        const getUserAppDataById = httpsCallable<
          { userId: string },
          UserAppDataDTO
        >(functions, Callable.GetUserAppDataById);
        const result = await getUserAppDataById({ userId: uid });
        const { band, events, fcmToken } = result.data;

        setUser({
          uid,
          email: email!,
          name: displayName!,
          jwtToken: jwtToken.token,
          role: jwtToken.claims.role as string,
          band,
          events,
          fcmToken
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
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError({
        header: 'Login failed',
        message: 'Please check your email and password and try again.'
      });
    }
  };

  const logOut = async () => await signOut(auth);

  const addMemberToBand = (member: Member) => {
    setUser((prevState) => ({
      ...prevState!,
      band: {
        ...prevState!.band!,
        members: [...prevState!.band!.members, member]
      }
    }));
  };

  const addEventToUser = (event: Event) => {
    setUser((prevState) => ({
      ...prevState!,
      events: [...prevState!.events!, event]
    }));
  };

  const updateEvent = (event: Event) => {
    setUser((prevState) => {
      const events = prevState?.events.filter((e) => e.uid !== event.uid) || [];
      return {
        ...prevState!,
        events: [...events, event]
      };
    });
  };

  return (
    <AuthContext.Provider
      value={{
        logOut,
        signUp,
        login,
        loading,
        user,
        addMemberToBand,
        addEventToUser,
        updateEvent,
        setLoading,
        error,
        setError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
