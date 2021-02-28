const imgur = require('../lib/imgur.js'),
  Q = require('q');

describe('SEARCH', function () {
  describe('search options validations', function () {
    test('should fail when query is not passed', function () {
      const errMsg =
        'Search requires a query. Try searching with a query (e.g cats).';
      expect(imgur.search()).rejects.toMatch(errMsg);
    });

    test('should fail when query is passed a boolean', function () {
      const errMsg = 'You did not pass a string as a query.';
      expect(imgur.search(true)).rejects.toMatch(errMsg);
    });

    test('should fail when query is passed a number', function () {
      const errMsg = 'You did not pass a string as a query.';
      expect(imgur.search(1)).rejects.toMatch(errMsg);
    });

    test('should fail when query is passed a number', function () {
      const errMsg = 'You did not pass a string as a query.';
      expect(imgur.search(1)).rejects.toMatch(errMsg);
    });
  });

  describe("delegates to _imgurRequest('search', ...)", function () {
    const mockResult = {
      data: [],
      params: {
        page: '1',
        dateRange: 'month',
        sort: 'viral',
      },
    };
    const payload = '/viral/month/1?q=meme';
    const _imgurRequestBackup = imgur._imgurRequest;

    beforeEach(function () {
      const deferred = Q.defer();
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
      const promise = imgur.search('meme', {
        sort: 'viral',
        dateRange: 'month',
        page: '1',
      });

      expect(imgur._imgurRequest).toHaveBeenCalledWith('search', payload);
      expect(promise).resolves.toMatchObject(mockResult);
    });
  });
});
