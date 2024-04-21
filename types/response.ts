export interface CloudFunctionResponse {
  statusCode: number;
  message: string;
  error?: string
}

export interface AddEventResponse extends CloudFunctionResponse {
  event: {
    uid: string;
  };
}

export interface CreateNewUserResponse {
  jwtToken: string;
}
