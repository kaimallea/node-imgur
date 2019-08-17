import deleteComment from '../delete';

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

test('deleteComment calls the correct endpoint and resolves', () => {
  const mockResponse = '{"success":true}';
  mockDelete.mockReturnValueOnce(Promise.resolve(mockResponse));

  const promiseResponse = deleteComment(new MockClient(), '1234');
  expect(promiseResponse).resolves.toBe(mockResponse);
  expect(mockDelete).toHaveBeenCalledTimes(1);
  expect(mockDelete).toHaveBeenCalledWith(
    'https://api.imgur.com/3/comment/1234',
  );
});
