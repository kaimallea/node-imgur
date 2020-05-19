import { votes } from '../votes';

const mockGet = jest.fn();
const MockClient = jest.fn().mockImplementation(() => {
  return {
    get: mockGet,
  };
});

beforeEach(() => {
  MockClient.mockClear();
  mockGet.mockClear();
});

test('votes calls the correct endpoint and resolves', () => {
  const mockResponse = '{"success":true}';
  mockGet.mockReturnValueOnce(Promise.resolve(mockResponse));

  const promiseResponse = votes(new MockClient(), '1234');

  expect(promiseResponse).resolves.toBe(mockResponse);
  expect(mockGet).toHaveBeenCalledTimes(1);
  expect(mockGet).toHaveBeenCalledWith(
    `https://api.imgur.com/3/gallery/1234/votes`,
  );
});
