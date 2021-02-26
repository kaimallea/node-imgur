var imgur = require('../lib/imgur.js');

describe('setAPIUrl()', function () {
  beforeEach(function () {
    var defaultImgurAPIUrl = 'https://api.imgur.com/3/';
    imgur.setAPIUrl(defaultImgurAPIUrl);
  });

  test('should return the API Url that was set', function () {
    var imgurAPIUrl = 'https://imgur-apiv3.p.mashape.com/';
    imgur.setAPIUrl(imgurAPIUrl);
    return expect(imgur.getAPIUrl()).toBe(imgurAPIUrl);
  });

  test('should not set an empty API Url', function () {
    var imgurAPIUrl = '';
    imgur.setAPIUrl(imgurAPIUrl);
    return expect(imgur.getAPIUrl()).not.toBe(imgurAPIUrl);
  });

  test('should not set a number', function () {
    var imgurAPIUrl = 1024;
    imgur.setAPIUrl(imgurAPIUrl);
    return expect(imgur.getAPIUrl()).not.toBe(imgurAPIUrl);
  });

  test('should not set a boolean', function () {
    var imgurAPIUrl = false;
    imgur.setAPIUrl(imgurAPIUrl);
    return expect(imgur.getAPIUrl()).not.toBe(imgurAPIUrl);
  });
});
