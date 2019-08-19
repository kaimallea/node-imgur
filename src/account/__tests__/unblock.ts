import unblock from '../unblock';

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

test('unblock calls the correct endpoint and resolves', () => {
  const mockResponse = '{"success":true}';
  mockGet.mockReturnValueOnce(Promise.resolve(mockResponse));
  const promiseResponse = unblock(new MockClient(), 'john');
  expect(promiseResponse).resolves.toBe(mockResponse);
  expect(mockGet).toHaveBeenCalledTimes(1);
  expect(mockGet).toHaveBeenCalledWith(
    'https://api.imgur.com/account/v1/john/block'
  );
});
