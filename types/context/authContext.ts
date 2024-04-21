import { ReactNode } from 'react';
import { CreateNewUser, User } from '../authentication';
import { Member } from '../member';

export interface AuthContextProviderProps {
  children: ReactNode;
}

export interface AuthenticationContext {
  user: User | null;
  loading: boolean;
  signUp: (data: CreateNewUser) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  addMemberToBand: (member: Member) => void;
}
