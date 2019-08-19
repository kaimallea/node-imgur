import deleteImage from '../delete';

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

test('deleteImage calls the correct endpoint and resolves', () => {
  const mockResponse = '{"success":true}';
  mockGet.mockReturnValueOnce(Promise.resolve(mockResponse));
  const mockImageDeleteHash = '123456'
  const promiseResponse = deleteImage(new MockClient(), mockImageDeleteHash);
  expect(promiseResponse).resolves.toBe(mockResponse);
  expect(mockGet).toHaveBeenCalledTimes(1);
  expect(mockGet).toHaveBeenCalledWith(
    `https://api.imgur.com/3/image/${mockImageDeleteHash}`,
  );
});
