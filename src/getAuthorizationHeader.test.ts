import { ImgurClient } from './client';
import { getAuthorizationHeader } from './getAuthorizationHeader';

test('returns provided access code in bearer header', async () => {
  const accessToken = 'abc123';
  const client = new ImgurClient({ accessToken });
  const authorizationHeader = await getAuthorizationHeader(client);
  expect(authorizationHeader).toBe(`Bearer ${accessToken}`);
});

test('returns provided client id in client id header', async () => {
  const clientId = 'abc123';
  const client = new ImgurClient({ clientId });
  const authorizationHeader = await getAuthorizationHeader(client);
  expect(authorizationHeader).toBe(`Client-ID ${clientId}`);
});

test('retrieves access token from imgur via provided username/password/clientid', async () => {
  const client = new ImgurClient({
    username: 'fakeusername',
    password: 'fakepassword',
    clientId: 'fakeclientd',
  });
  const authorizationHeader = await getAuthorizationHeader(client);
  expect(authorizationHeader).toMatchInlineSnapshot(
    `"Bearer 123accesstoken456"`
  );
});
