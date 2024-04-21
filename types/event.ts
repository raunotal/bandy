import { EventStatus, EventType } from '../enums/event';

export interface Event {
  startDateTime: Date;
  endDateTime: Date;
  eventType: EventType;
  location: string;
  venue: string;
  status?: EventStatus;
}
