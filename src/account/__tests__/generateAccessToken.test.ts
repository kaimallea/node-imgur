import { generateAccessToken } from '../index';
import { ACCESS_TOKEN_URI } from '../../endpoints';

const mockRequest = jest.fn();
const mockPost = jest.fn();
const mockGet = jest.fn();

const mockClient = jest.fn().mockImplementation(() => {
  return {
    request: mockRequest,
    post: mockPost,
    get: mockGet,
  };
});

beforeEach(() => {
  mockClient.mockClear();
  mockRequest.mockClear();
  mockPost.mockClear();
  mockGet.mockClear();
});

test('getAccessToken calls the correct endpoint and resolves', () => {
  const body = {
    refresh_token: 'myRefreshToken',
    client_id: 'myId',
    client_secret: 'mySecret',
    grant_type: 'refresh_token',
  };

  const mockResponse = '{"success":true}';
  mockPost.mockReturnValueOnce(Promise.resolve(mockResponse));

  const promiseResponse = generateAccessToken(new mockClient(), body);

  expect(promiseResponse).resolves.toBe(mockResponse);
  expect(mockPost).toHaveBeenCalledTimes(1);
  expect(mockPost).toHaveBeenCalledWith(ACCESS_TOKEN_URI, body);
});
