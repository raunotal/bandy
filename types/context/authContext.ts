import { ReactNode } from 'react';
import { CreateNewUser, User } from '../authentication';
import { Member } from '../member';
import { AddEventForm, Event } from '../event';
import { Alert } from '../app';

export interface AuthContextProviderProps {
  children: ReactNode;
}

export interface AuthenticationContext {
  user: User | null;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: Alert | null;
  setError: (error: Alert | null) => void;
  signUp: (data: CreateNewUser) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  addMemberToBand: (member: Member) => void;
  addEventToUser: (event: AddEventForm, members: Member[]) => void;
  updateEvent: (event: Event) => void;
}
