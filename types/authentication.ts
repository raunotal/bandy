import { Band } from './band';
import { Event } from './event';

export interface CreateNewUser {
  name: string;
  email: string;
  password: string;
  instrument?: string;
  isManager: boolean;
  bandName?: string;
}

export interface UserBasicInfo {
  uid: string;
  email: string;
  name: string;
  role: string;
  fcmToken: string;
}

export interface User extends UserBasicInfo {
  jwtToken: string;
  band: Band | null;
  events: Event[];
}
