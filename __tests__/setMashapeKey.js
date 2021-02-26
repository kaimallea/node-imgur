var imgur = require('../lib/imgur.js');

describe('setMashapeKey()', function () {
  beforeEach(function () {
    var defaultMashapeKey = '0123456789abcdef';
    imgur.setMashapeKey(defaultMashapeKey);
  });

  test('should return the Mashape Key that was set', function () {
    var mashapeKey = '0123456789abcdef';
    imgur.setMashapeKey(mashapeKey);
    return expect(imgur.getMashapeKey()).toBe(mashapeKey);
  });

  test('should not set an empty Mashape Key', function () {
    var mashapeKey = '';
    imgur.setMashapeKey(mashapeKey);
    return expect(imgur.getMashapeKey()).not.toBe(mashapeKey);
  });

  test('should not set a number', function () {
    var mashapeKey = 1024;
    imgur.setMashapeKey(mashapeKey);
    return expect(imgur.getMashapeKey()).not.toBe(mashapeKey);
  });

  test('should not set a boolean', function () {
    var mashapeKey = false;
    imgur.setMashapeKey(mashapeKey);
    return expect(imgur.getMashapeKey()).not.toBe(mashapeKey);
  });
});
