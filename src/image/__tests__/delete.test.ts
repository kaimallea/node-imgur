import deleteImage from '../delete';

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

test('deleteImage calls the correct endpoint and resolves', () => {
  const mockResponse = '{"success":true}';
  mockDelete.mockReturnValueOnce(Promise.resolve(mockResponse));
  const mockImageDeleteHash = '123456';
  const promiseResponse = deleteImage(new MockClient(), mockImageDeleteHash);
  expect(promiseResponse).resolves.toBe(mockResponse);
  expect(mockDelete).toHaveBeenCalledTimes(1);
  expect(mockDelete).toHaveBeenCalledWith(
    `https://api.imgur.com/3/image/${mockImageDeleteHash}`,
  );
});
