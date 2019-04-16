// We use the real `Response` constructor from the actual node-fetch module
const { Response } = require.requireActual('node-fetch');
// And then mock `fetch` going forward using `Response` with mock data
jest.mock('node-fetch', () =>
  jest.fn(() =>
    Promise.resolve(
      new Response('{"data": [], "status": 400, "success": false}')
    )
  )
);
const fetch = require.requireMock('node-fetch');

import { generateAccessToken } from '../index';
import { IMGUR_API_ACCESS_TOKEN_URI } from '../generateAccessToken';

beforeEach(() => {
  fetch.mockReset();
});

test('getAccessToken calls the correct endpoint and resolves', async () => {
  const body = {
    refresh_token: 'myRefreshToken',
    client_id: 'myId',
    client_secret: 'mySecret',
    grant_type: 'refresh_token',
  };

  const mockResponse = JSON.stringify(
    require('../__fixtures__/generateAccessTokenResponseSuccess.json')
  );
  fetch.mockReturnValue(Promise.resolve(new Response(mockResponse)));

  const expectedParams = new URLSearchParams(body);

  await expect(generateAccessToken(body)).resolves.toMatchInlineSnapshot(`
                      Object {
                        "access_token": "b6fb3801f9caf9968c369532ce26666d868f54fbfake",
                        "account_id": 123456,
                        "account_username": "testuser",
                        "expires_in": 315360000,
                        "refresh_token": "183b1z001c5a4be719083e5221d8f2718b184694fake",
                        "scope": "",
                        "token_type": "bearer",
                      }
                  `);
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(IMGUR_API_ACCESS_TOKEN_URI, {
    body: expectedParams,
    method: 'POST',
  });
});

test('getAccessToken returns invalid access token', async () => {
  const body = {
    refresh_token: 'myInvalidRefreshToken',
    client_id: 'myId',
    client_secret: 'mySecret',
    grant_type: 'refresh_token',
  };

  const mockResponse = JSON.stringify(
    require('../__fixtures__/generateAccessTokenResponseInvalidRefreshToken.json')
  );
  fetch.mockReturnValue(Promise.resolve(new Response(mockResponse)));

  const expectedParams = new URLSearchParams(body);

  await expect(generateAccessToken(body)).resolves.toMatchInlineSnapshot(`
          Object {
            "data": Object {
              "error": "Invalid refresh token",
              "method": "POST",
              "request": "/oauth2/token",
            },
            "status": 400,
            "success": false,
          }
        `);
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(IMGUR_API_ACCESS_TOKEN_URI, {
    body: expectedParams,
    method: 'POST',
  });
});
