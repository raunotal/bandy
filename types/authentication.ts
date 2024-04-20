import { Band } from './band';

export interface AuthenticationContext {
  isUserLoggedIn: boolean;
  loading: boolean;
  signUp: (data: CreateNewUser) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
}

export interface CreateNewUser {
  name: string;
  email: string;
  password: string;
  instrument?: string;
  isManager: boolean;
  bandName?: string;
}

export interface CreateNewUserResponse {
  jwtToken: string;
}

export interface UserBasicInfo {
  uid: string;
  email: string;
  name: string;
  role: string;
  phoneNumber: string;
  bands: Band[];
}

export interface User extends UserBasicInfo {
  jwtToken: string;
}
