import { Band } from '../band';
import { Event } from '../event';
import { Member } from '../member';

export interface GetUsersWithMemberRoleDTO {
  members: Member[];
}

export interface UserAppDataDTO {
  fcmToken: string;
  band: Band | null;
  events: Event[];
}
export interface RegisterTokenDTO {
  uid: string;
  token: string;
}
