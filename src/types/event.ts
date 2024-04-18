export enum EventStatus {
  Confirmed = 'confirmed',
  Pending = 'pending',
  Cancelled = 'cancelled',
}

export interface Event {
  startDateTime: string;
  endDateTime: string;
  eventType: string;
  location: string;
  venue: string;
  status: EventStatus;
}
