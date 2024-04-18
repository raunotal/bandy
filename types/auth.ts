export interface CreateNewUser {
  displayName: string;
  email: string;
  password: string;
  isManager: boolean;
  bandName?: string;
  phoneNumber: string;
}
