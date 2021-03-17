import unblock from '../unblock';

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

test('unblock calls the correct endpoint and resolves', () => {
  const mockResponse = '{"success":true}';
  mockDelete.mockReturnValueOnce(Promise.resolve(mockResponse));
  const promiseResponse = unblock(new MockClient(), 'john');
  expect(promiseResponse).resolves.toBe(mockResponse);
  expect(mockDelete).toHaveBeenCalledTimes(1);
  expect(mockDelete).toHaveBeenCalledWith(
    'https://api.imgur.com/account/v1/john/block',
  );
});
