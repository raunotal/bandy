import { Status } from '../../enums/event';

export const getTitleTypeFromEventStatus = (status: Status) => {
  switch (status) {
    case Status.Confirmed:
      return "success";
    case Status.Pending:
      return "warning";
    case Status.Cancelled:
      return "danger";
    default:
      return "medium";
  }
};

export const extractDate = (dateTime: Date): string => {
  const date = new Date(dateTime);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formatter = new Intl.DateTimeFormat("et-EE", options);
  return formatter.format(date);
};

export const extractTime = (dateTime: Date): string => {
  const date = new Date(dateTime);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
