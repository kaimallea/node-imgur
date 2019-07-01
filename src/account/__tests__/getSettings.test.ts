import { getSettings } from '../getSettings';
import { ACCOUNT_SETTINGS } from '../../endpoints';

const mockGet = jest.fn();
const mockClient = jest.fn().mockImplementation(() => {
  return {
    get: mockGet,
  };
});

beforeEach(() => {
  mockClient.mockClear();
  mockGet.mockClear();
});

test('getAccessToken calls the correct endpoint and resolves', () => {
  const mockResponse = '{"success":true}';
  mockGet.mockReturnValueOnce(Promise.resolve(mockResponse));

  const promiseResponse = getSettings(new mockClient());

  expect(promiseResponse).resolves.toBe(mockResponse);
  expect(mockGet).toHaveBeenCalledTimes(1);
  expect(mockGet).toHaveBeenCalledWith(ACCOUNT_SETTINGS);
});
