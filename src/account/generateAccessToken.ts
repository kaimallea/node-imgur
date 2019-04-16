import fetch from 'node-fetch';
import { URLSearchParams } from 'url';

const IMGUR_API_ACCESS_TOKEN_URI = 'https://api.imgur.com/oauth2/token';

interface AccessTokenRequestBody {
  [key: string]: string | undefined;
  refresh_token: string;
  client_id: string;
  client_secret: string;
  grant_type?: string;
}

interface AccessTokenResponseInvalid {
  data: any;
  success: boolean;
  status: number;
}

interface AccessTokenResponseSuccess {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
  account_id: number;
  account_username: string;
}

async function generateAccessToken(
  body: AccessTokenRequestBody
): Promise<AccessTokenResponseSuccess | AccessTokenResponseInvalid> {
  if (body.grant_type !== 'refresh_token') {
    body.grant_type = 'refresh_token';
  }

  const params = new URLSearchParams(body);
  const response = await fetch(IMGUR_API_ACCESS_TOKEN_URI, {
    method: 'POST',
    body: params,
  });

  return response.json();
}

export { IMGUR_API_ACCESS_TOKEN_URI, generateAccessToken };
