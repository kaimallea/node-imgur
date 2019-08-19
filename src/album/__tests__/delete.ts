import deleteAlbum from '../delete';

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

const mockAlbumHash = `fc1f5de1-f8dc-4ba7-9f17-52ab9ad8c46c`;

test('deleteAlbum calls the correct endpoint and resolves', () => {
  const mockResponse = '{"success":true}';
  mockDelete.mockReturnValueOnce(Promise.resolve(mockResponse));
  const promiseResponse = deleteAlbum(new MockClient(), mockAlbumHash);
  expect(promiseResponse).resolves.toBe(mockResponse);
  expect(mockDelete).toHaveBeenCalledTimes(1);
  expect(mockDelete).toHaveBeenCalledWith(
    `https://api.imgur.com/3/album/${mockAlbumHash}`,
  );
});
