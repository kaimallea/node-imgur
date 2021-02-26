var imgur = require('../lib/imgur.js');

describe('getAPIUrl()', function () {
  test('should return the default API URL, if nothing is set', function () {
    var defaultAPIUrl = 'https://api.imgur.com/3/';
    return expect(imgur.getAPIUrl()).toBe(defaultAPIUrl);
  });

  test('should return the same API URL that was set', function () {
    var apiUrl = 'https://imgur-apiv3.p.mashape.com/';
    imgur.setAPIUrl(apiUrl);

    return expect(imgur.getAPIUrl()).toBe(apiUrl);
  });
});
