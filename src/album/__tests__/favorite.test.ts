import favoriteAlbum from '../favorite';

const mockPost = jest.fn();
const MockClient = jest.fn().mockImplementation(() => {
  return {
    post: mockPost,
  };
});

beforeEach(() => {
  MockClient.mockClear();
  mockPost.mockClear();
});

test('favoriteAlbum calls the correct endpoint and resolves', () => {
  const mockResponse = '{"success":true}';
  mockPost.mockReturnValueOnce(Promise.resolve(mockResponse));
  const mockImageHash = '123456';
  const promiseResponse = favoriteAlbum(new MockClient(), mockImageHash);
  expect(promiseResponse).resolves.toBe(mockResponse);
  expect(mockPost).toHaveBeenCalledTimes(1);
  expect(mockPost).toHaveBeenCalledWith(
    `https://api.imgur.com/3/album/123456/favorite`,
    {},
  );
});
