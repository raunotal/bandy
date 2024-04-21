import { Event } from "../event";
import { Member } from "../member";

export interface AddEventDTO extends Event {
  members: Member[];
}
