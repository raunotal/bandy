export interface AuthenticationContext {
  user: UserBasicInfo | null;
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
}

export interface User extends UserBasicInfo {
  jwtToken: string;
}
