import { Status, EventType } from '../enums/event';
import { Member } from './member';

export interface Event {
  uid?: string;
  managerId: string;
  startDateTime: string;
  endDateTime: string;
  eventType: EventType;
  location: string;
  venue: string;
  description: string;
  status?: Status;
  members: Member[]
}

export interface AddEventForm {
  startDateTime: string;
  endDateTime: string;
  eventType: EventType;
  location: string;
  venue: string;
  description: string;
  members: Member[];
  managerId: string
}