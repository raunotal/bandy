import { AddEventForm } from '../event';
import { Member } from '../member';

export interface AddEventDTO extends AddEventForm {
  members: Member[];
  managerId: string;
}
