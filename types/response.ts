import { Event } from "./event";

export interface CloudFunctionResponse {
  statusCode: number;
  message: string;
  error?: string
}

export interface AddEventResponse extends CloudFunctionResponse {
  event: Event;
}

export interface CreateNewUserResponse {
  jwtToken: string;
}
