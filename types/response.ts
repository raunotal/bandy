export interface CloudFunctionResponse {
  statusCode: number;
  message: string;
  error?: string
}

export interface AddEventResponse extends CloudFunctionResponse {
  event: {
    eventId: string;
  };
}

export interface CreateNewUserResponse {
  jwtToken: string;
}
