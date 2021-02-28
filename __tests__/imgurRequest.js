const imgur = require('../lib/imgur.js'),
  imgurTestId1 = 'mbgq7nd'; // Kitten

describe('_imgurRequest()', function () {
  test('should fail with no input', function () {
    const errMsg = 'Invalid argument';

    expect(imgur._imgurRequest()).rejects.toMatch(errMsg);
  });

  test('should fail with an invalid operation specified', function () {
    const errMsg = 'Invalid operation';

    expect(imgur._imgurRequest('blah', imgurTestId1)).rejects.toMatch(errMsg);
  });
});
