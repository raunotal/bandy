import { EventStatus } from '../../enums/event';

export const getTitleTypeFromEventStatus = (status: EventStatus) => {
  switch (status) {
    case EventStatus.Confirmed:
      return "success";
    case EventStatus.Pending:
      return "warning";
    case EventStatus.Cancelled:
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
  return dateTimeString.split("T")[1];
};
