import { Member } from './member';

export interface Band {
  name: string;
  events: Event[];
  members: Member[];
}
