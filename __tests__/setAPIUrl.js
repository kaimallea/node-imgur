const imgur = require('../lib/imgur.js');

describe('setAPIUrl()', function () {
  beforeEach(function () {
    const defaultImgurAPIUrl = 'https://api.imgur.com/3/';
    imgur.setAPIUrl(defaultImgurAPIUrl);
  });

  test('should return the API Url that was set', function () {
    const imgurAPIUrl = 'https://imgur-apiv3.p.mashape.com/';
    imgur.setAPIUrl(imgurAPIUrl);
    return expect(imgur.getAPIUrl()).toBe(imgurAPIUrl);
  });

  test('should not set an empty API Url', function () {
    const imgurAPIUrl = '';
    imgur.setAPIUrl(imgurAPIUrl);
    return expect(imgur.getAPIUrl()).not.toBe(imgurAPIUrl);
  });

  test('should not set a number', function () {
    const imgurAPIUrl = 1024;
    imgur.setAPIUrl(imgurAPIUrl);
    return expect(imgur.getAPIUrl()).not.toBe(imgurAPIUrl);
  });

  test('should not set a boolean', function () {
    const imgurAPIUrl = false;
    imgur.setAPIUrl(imgurAPIUrl);
    return expect(imgur.getAPIUrl()).not.toBe(imgurAPIUrl);
  });
});
