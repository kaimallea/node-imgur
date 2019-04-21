import { Client } from '../client';
import { ACCESS_TOKEN_URI } from '../endpoints';

export interface AccessTokenRequestBody {
  [key: string]: string | undefined;
  refresh_token: string;
  client_id: string;
  client_secret: string;
  grant_type?: string;
}

export interface AccessTokenResponseInvalid {
  data: any;
  success: boolean;
  status: number;
}

export interface AccessTokenResponseSuccess {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
  account_id: number;
  account_username: string;
}

export function generateAccessToken(
  client: Client,
  body: AccessTokenRequestBody
): Promise<AccessTokenResponseSuccess | AccessTokenResponseInvalid> {
  if (body.grant_type !== 'refresh_token') {
    body.grant_type = 'refresh_token';
  }

  return client.post(ACCESS_TOKEN_URI, body);
}
