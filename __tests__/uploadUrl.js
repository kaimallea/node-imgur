var imgur = require('../lib/imgur.js'),
  Q = require('q');

describe('uploadUrl()', function () {
  describe('validation', function () {
    test('should fail with no url', function () {
      var errMsg = 'Invalid URL';

      expect(imgur.uploadUrl()).rejects.toMatch(errMsg);
    });

    test('should fail with on a malformed url', function () {
      var errMsg = 'Invalid URL';

      expect(imgur.uploadUrl('blarg')).rejects.toMatch(errMsg);
    });
  });

  describe("delegates to _imgurRequest('upload', ...)", function () {
    var mockResult = { foo: 'bar' };
    var testUrl = 'https://somewhere/test.png';

    var _imgurRequestBackup = imgur._imgurRequest;

    beforeEach(function () {
      var deferred = Q.defer();
      imgur._imgurRequest = jest
        .fn()
        .mockImplementation(() => deferred.promise);
      deferred.resolve(mockResult);
    });

    afterEach(function () {
      imgur._imgurRequest.mockClear();
      imgur._imgurRequest = _imgurRequestBackup;
    });

    test('should delegate', function () {
      var promise = imgur.uploadUrl(testUrl);

      expect(imgur._imgurRequest).toHaveBeenCalledWith('upload', testUrl, {
        type: 'url',
      });
      expect(promise).resolves.toMatchObject(mockResult);
    });

    test('should propagate albumId', function () {
      var albumId = '123';
      var promise = imgur.uploadUrl(testUrl, albumId);

      expect(imgur._imgurRequest).toHaveBeenCalledWith('upload', testUrl, {
        album: albumId,
        type: 'url',
      });
      expect(promise).resolves.toMatch(mockResult);
    });
  });
});
