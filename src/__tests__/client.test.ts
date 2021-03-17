// We use the real `Response` constructor from the actual node-fetch module
const { Response } = require.requireActual('node-fetch');

// And then mock `fetch` going forward using `Response` with mock data
jest.mock('node-fetch', () =>
  jest.fn(() =>
    Promise.resolve(
      new Response('{"data": [], "status": 400, "success": false}'),
    ),
  ),
);

const fetch = require.requireMock('node-fetch');

import { Client } from '../client';
import FormData from 'form-data';
import createForm from '../helpers/createForm';
import * as cache from '../cache';

beforeEach(() => {
  fetch.mockReset();
  jest.clearAllMocks();
});

test('Client instantiates with access token', () => {
  const client = new Client({ access_token: 'abc1234' });
  expect(client.access_token).toBe('abc1234');
  expect(client.client_id).toBeUndefined();
  expect(client.anonymous).toBe(false);
});

test('Client instantiates with client ID', () => {
  const client = new Client({ client_id: 'abc12345' });
  expect(client.client_id).toBe('abc12345');
  expect(client.access_token).toBeUndefined();
  expect(client.anonymous).toBe(true);
});

test('Client contructor throws without auth credentials', () => {
  expect(() => new Client({})).toThrowErrorMatchingInlineSnapshot(
    `"Client requires an access token or client ID to make requests against the Imgur API"`,
  );
});

test('requests are decorated with an access token', async () => {
  fetch.mockReturnValue(Promise.resolve(new Response('{"success": true}')));
  const client = new Client({ access_token: 'abc123' });
  await client.request('https://www.blah.com', {
    method: 'GET',
  });
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith('https://www.blah.com', {
    headers: {
      Authorization: 'Bearer abc123',
    },
    method: 'GET',
  });
});

test('requests are decorated with a client ID', async () => {
  fetch.mockReturnValue(Promise.resolve(new Response('{"success": true}')));
  const client = new Client({ client_id: 'abc123' });
  await client.request('https://www.blahs.com', {
    method: 'GET',
  });
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith('https://www.blahs.com', {
    headers: {
      Authorization: 'Client-ID abc123',
    },
    method: 'GET',
  });
});

test('post() has correct headers and generated form data', async () => {
  fetch.mockReturnValue(Promise.resolve(new Response('{"success": true}')));
  const client = new Client({ access_token: 'abc123' });
  const params = {
    image: 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    type: 'bas64',
  };

  await client.post('https://www.blah.com', params);

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch.mock.calls[0][0]).toBe('https://www.blah.com');

  // Get the instance of FormData generated by post(). FormData generates
  // forms with some randomized form-data boundaries that is nondeterministic
  const generatedForm = fetch.mock.calls[0][1].body;

  expect(generatedForm).toBeInstanceOf(FormData);
  expect(fetch).toHaveBeenCalledWith('https://www.blah.com', {
    headers: {
      ...generatedForm.getHeaders(),
      Authorization: 'Bearer abc123',
    },
    body: generatedForm,
    method: 'POST',
  });
});

test('post() has correct headers and passed in form data reference', async () => {
  fetch.mockReturnValue(Promise.resolve(new Response('{"success": true}')));
  const client = new Client({ access_token: 'abc123' });
  const params = {
    image: 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    type: 'base64',
  };

  const form = createForm(params);

  await client.post('https://www.blah.com', form);
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith('https://www.blah.com', {
    headers: {
      ...form.getHeaders(),
      Authorization: 'Bearer abc123',
    },
    body: form,
    method: 'POST',
  });
});

test('calls cacheGet when calling request', async () => {
  fetch.mockReturnValue(Promise.resolve(new Response('{"success": true}')));
  const client = new Client({ access_token: 'abc123' });
  const params = {
    image: 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    type: 'base64',
  };

  const cacheGetSpy = jest.spyOn(cache, 'cacheGet');

  const form = createForm(params);

  await client.post('https://www.abc.com', form);
  expect(cacheGetSpy).toHaveBeenCalledTimes(1);
});

test('calls cacheSet when calling request', async () => {
  fetch.mockReturnValue(Promise.resolve(new Response('{"success": true}')));
  const client = new Client({ access_token: 'abc123' });
  const params = {
    image: 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    type: 'base64',
  };

  const cacheSetSpy = jest.spyOn(cache, 'cacheSet');

  const form = createForm(params);

  await client.post('https://www.abc.com', form);
  expect(cacheSetSpy).toHaveBeenCalledTimes(1);
});

test('fetches from the cache on subsequent post requests', async () => {
  fetch.mockReturnValue(Promise.resolve(new Response('{"success": true}')));
  const client = new Client({ access_token: 'abc123' });
  const params = {
    image: 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    type: 'base64',
  };

  const cacheSetSpy = jest.spyOn(cache, 'cacheSet');

  const form = createForm(params);

  await client.post('https://www.abc.com', form);
  await client.post('https://www.abc.com', form);
  await client.post('https://www.abc.com', form);

  expect(cacheSetSpy).toHaveBeenCalledTimes(1);
});

test('fetches from the cache on subsequent get requests', async () => {
  fetch.mockReturnValue(Promise.resolve(new Response('{"success": true}')));
  const client = new Client({ access_token: 'abc123' });
  const cacheSetSpy = jest.spyOn(cache, 'cacheSet');
  await client.get('https://www.txyz.com');
  await client.get('https://www.txyz.com');
  await client.get('https://www.txyz.com');

  expect(cacheSetSpy).toHaveBeenCalledTimes(1);
});

test('get() has correct headers', async () => {
  fetch.mockReturnValue(Promise.resolve(new Response('{"success": true}')));
  const client = new Client({ access_token: 'abc123' });
  await client.get('https://www.xyz.com');
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith('https://www.xyz.com', {
    headers: {
      Authorization: 'Bearer abc123',
    },
    method: 'GET',
  });
});

test('delete() has correct headers', async () => {
  fetch.mockReturnValue(Promise.resolve(new Response('{"success": true}')));
  const client = new Client({ access_token: 'abc123' });
  await client.delete('https://www.mlop.com');
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith('https://www.mlop.com', {
    headers: {
      Authorization: 'Bearer abc123',
    },
    method: 'DELETE',
  });
});
