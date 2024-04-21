import { Status } from '../enums/event';

export interface Member {
  uid?: string;
  name: string;
  instrument: string;
  image?: string;
  band?: string;
  status?: Status;
}
