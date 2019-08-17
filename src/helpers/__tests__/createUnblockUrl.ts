import createUnblockUrl from '../createUnblockUrl';

test('createUnblockUrl returns a constructed unblock url', () => {
  const unblockUrl = createUnblockUrl('john');
  expect(unblockUrl).toBe('https://api.imgur.com/account/v1/john/block');
});
