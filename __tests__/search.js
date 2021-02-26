var imgur = require('../lib/imgur.js'),
  Q = require('q');

describe('SEARCH', function () {
  describe('search options validations', function () {
    test('should fail when query is not passed', function () {
      var errMsg =
        'Search requires a query. Try searching with a query (e.g cats).';
      expect(imgur.search()).rejects.toMatch(errMsg);
    });

    test('should fail when query is passed a boolean', function () {
      var errMsg = 'You did not pass a string as a query.';
      expect(imgur.search(true)).rejects.toMatch(errMsg);
    });

    test('should fail when query is passed a number', function () {
      var errMsg = 'You did not pass a string as a query.';
      expect(imgur.search(1)).rejects.toMatch(errMsg);
    });

    test('should fail when query is passed a number', function () {
      var errMsg = 'You did not pass a string as a query.';
      expect(imgur.search(1)).rejects.toMatch(errMsg);
    });
  });

  describe("delegates to _imgurRequest('search', ...)", function () {
    var mockResult = {
      data: [],
      params: {
        page: '1',
        dateRange: 'month',
        sort: 'viral',
      },
    };
    var payload = '/viral/month/1?q=meme';
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

    it('should delegate', function () {
      var promise = imgur.search('meme', {
        sort: 'viral',
        dateRange: 'month',
        page: '1',
      });

      expect(imgur._imgurRequest).toHaveBeenCalledWith('search', payload);
      expect(promise).resolves.toMatchObject(mockResult);
    });
  });
});
