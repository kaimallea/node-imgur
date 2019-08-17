import unfollowTag from '../unfollowTag';

const mockGet = jest.fn();
const MockClient = jest.fn().mockImplementation(() => {
  return {
    delete: mockGet,
  };
});

beforeEach(() => {
  MockClient.mockClear();
  mockGet.mockClear();
});

test('unfollowTag calls the correct endpoint and resolves', () => {
  const mockResponse = '{"success":true}';
  mockGet.mockReturnValueOnce(Promise.resolve(mockResponse));
  const mockTag = 'cats';
  const promiseResponse = unfollowTag(new MockClient(), mockTag);
  expect(promiseResponse).resolves.toBe(mockResponse);
  expect(mockGet).toHaveBeenCalledTimes(1);
  expect(mockGet).toHaveBeenCalledWith(`https://api.imgur.com/3/account/me/follow/tag/${mockTag}`);
});
