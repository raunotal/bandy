import { Status, EventType } from '../enums/event';
import { Member } from './member';

export interface Event {
  uid?: string;
  startDateTime: Date;
  endDateTime: Date;
  eventType: EventType;
  location: string;
  venue: string;
  status?: Status;
  members: Member[]
}
