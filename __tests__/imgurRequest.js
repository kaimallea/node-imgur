const imgur = require('../src/imgur.js'),
  imgurTestId1 = 'mbgq7nd'; // Kitten

describe('_imgurRequest()', () => {
  test('should fail with no input', () => {
    const errMsg = 'Invalid argument';

    expect(imgur._imgurRequest()).rejects.toThrowError(errMsg);
  });

  test('should fail with an invalid operation specified', () => {
    const errMsg = 'Invalid operation';

    expect(imgur._imgurRequest('blah', imgurTestId1)).rejects.toThrowError(
      errMsg
    );
  });
});
