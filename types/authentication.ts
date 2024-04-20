import { Band } from './band';

export interface AuthenticationContext {
  signUp: (data: CreateNewUser) => Promise<void>;
  loading: boolean;
  isUserLoggedIn: boolean;
}

export interface CreateNewUser {
  displayName: string;
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
  displayName: string;
  role: string;
  phoneNumber: string;
  bands: Band[];
}

export interface User extends UserBasicInfo {
  jwtToken: string;
}
