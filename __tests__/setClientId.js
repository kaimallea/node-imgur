const imgur = require('../lib/imgur.js');

describe('setClientId()', function () {
  beforeEach(function () {
    const defaultClientId = '0123456789abcdef';
    imgur.setClientId(defaultClientId);
  });

  test('should return the client id that was set', function () {
    const clientId = 'lolololol';
    imgur.setClientId(clientId);
    return expect(imgur.getClientId()).toBe(clientId);
  });

  test('should not set an empty client id', function () {
    const clientId = '';
    imgur.setClientId(clientId);
    return expect(imgur.getClientId()).not.toBe(clientId);
  });

  test('should not set a number', function () {
    const clientId = 1024;
    imgur.setClientId(clientId);
    return expect(imgur.getClientId()).not.toBe(clientId);
  });

  test('should not set a boolean', function () {
    const clientId = false;
    imgur.setClientId(clientId);
    return expect(imgur.getClientId()).not.toBe(clientId);
  });
});
