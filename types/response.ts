import { Event } from './event';
import { Member } from './member';

export interface CloudFunctionResponse {
  statusCode: number;
  message: string;
  error?: string;
}

export interface AddEventResponse extends CloudFunctionResponse {
  event: Event;
}

export interface AddMemberToBandResponse extends CloudFunctionResponse {
  member: Member;
}

export interface CreateNewUserResponse {
  jwtToken: string;
}
