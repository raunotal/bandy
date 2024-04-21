import { Member } from './member';

export interface Band {
  uid?: string;
  name: string;
  members: Member[];
}
