export enum EventStatus {
  Confirmed = "confirmed",
  Pending = "pending",
  Cancelled = "cancelled",
}

export interface DashboardEvent {
  band: {
    name: string;
  };
  event: {
    startDateTime: string;
    endDateTime: string;
    eventType: string;
    location: string;
    status: EventStatus;
  };
}
