import { Client } from '../client';
import { ACCESS_TOKEN_URI } from '../endpoints';
import {
  InvalidRefreshTokenResponse,
  RefreshTokenResponse,
} from '../responses';

export type AccessTokenRequestBody = {
  refresh_token: string;
  client_id: string;
  client_secret: string;
  grant_type?: string;
};

export function generateAccessToken(
  client: Client,
  body: AccessTokenRequestBody,
): Promise<RefreshTokenResponse | InvalidRefreshTokenResponse> {
  // grant_type is always the same, so let it be optional and autofill
  // if missing
  if (body.grant_type !== 'refresh_token') {
    body.grant_type = 'refresh_token';
  }

  return client.post(ACCESS_TOKEN_URI, body);
}
