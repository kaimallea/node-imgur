import deleteFromGallery from '../delete';

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

test('deleteFromGallery calls the correct endpoint and resolves', () => {
  const mockResponse = '{"success":true}';
  mockDelete.mockReturnValueOnce(Promise.resolve(mockResponse));
  const mockGalleryHash = '37ad6e9a-7995-4042-a179-0380b7291497';
  const promiseResponse = deleteFromGallery(new MockClient(), mockGalleryHash);
  expect(promiseResponse).resolves.toBe(mockResponse);
  expect(mockDelete).toHaveBeenCalledTimes(1);
  expect(mockDelete).toHaveBeenCalledWith(
    `https://api.imgur.com/3/gallery/${mockGalleryHash}`,
  );
});
