import { EventStatus } from "../types/event";

export const getTitleTypeFromEventStatus = (status: EventStatus) => {
  switch (status) {
    case "confirmed":
      return "success";
    case "pending":
      return "warning";
    case "cancelled":
      return "danger";
    default:
      return "medium";
  }
};

export const extractDate = (dateTimeString: string): string => {
  const date = new Date(dateTimeString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formatter = new Intl.DateTimeFormat("et-EE", options);
  return formatter.format(date);
};

export const extractTime = (dateTimeString: string): string => {
  const timePart = dateTimeString.split("T")[1];
  return timePart;
};

export const getEventStatus = (status: string): EventStatus => {
  switch (status) {
    case "confirmed":
      return EventStatus.Confirmed;
    case "pending":
      return EventStatus.Pending;
    case "cancelled":
      return EventStatus.Cancelled;
    default:
      return EventStatus.Pending;
  }
};
