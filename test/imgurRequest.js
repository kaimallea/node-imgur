var imgur = require('../lib/imgur.js'),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    expect = chai.expect,
    imgurTestId1 = 'mbgq7nd'; // Kitten

chai.use(chaiAsPromised);

describe('#_imgurRequest()', function() {
    beforeEach(function() {
    });

    it('should fail with no input', function(done) {
        var errMsg = 'Invalid argument';

        expect(imgur._imgurRequest())
            .to.be.rejectedWith(errMsg)
            .and.notify(done);
    });

    it('should fail with an invalid operation specified', function(done) {
        var errMsg = 'Invalid operation';

        expect(imgur._imgurRequest('blah', imgurTestId1))
            .to.be.rejectedWith(errMsg)
            .and.notify(done);
    });
});
