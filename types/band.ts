import { Member } from './member';
import { Event } from './event';

export interface Band {
  uid?: string;
  name: string;
  events: Event[];
  members: Member[];
}
