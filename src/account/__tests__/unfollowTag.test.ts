import unfollowTag from '../unfollowTag';

const mockDelete = jest.fn();
const MockClient = jest.fn().mockImplementation(() => {
  return {
    delete: mockDelete,
  };
});

beforeEach(() => {
  MockClient.mockClear();
  mockDelete.mockClear();
});

test('unfollowTag calls the correct endpoint and resolves', () => {
  const mockResponse = '{"success":true}';
  mockDelete.mockReturnValueOnce(Promise.resolve(mockResponse));
  const mockTag = 'cats';
  const promiseResponse = unfollowTag(new MockClient(), mockTag);
  expect(promiseResponse).resolves.toBe(mockResponse);
  expect(mockDelete).toHaveBeenCalledTimes(1);
  expect(mockDelete).toHaveBeenCalledWith(
    `https://api.imgur.com/3/account/me/follow/tag/${mockTag}`,
  );
});
