import { Band } from './band';

export interface AuthenticationContext {
  signUp: (data: CreateNewUser) => void;
  loading: boolean;
}

export interface CreateNewUser {
  displayName: string;
  email: string;
  password: string;
  isManager: boolean;
  bandName?: string;
  phoneNumber: string;
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
