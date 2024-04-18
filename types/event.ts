import { EventStatus } from '../enums/event';

export interface Event {
  startDateTime: string;
  endDateTime: string;
  eventType: string;
  location: string;
  venue: string;
  status: EventStatus;
}
