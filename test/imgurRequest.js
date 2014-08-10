(function() {
    'use strict';

    var imgur = require('../lib/imgur.js'),
        chai = require('chai'),
        chaiAsPromised = require('chai-as-promised'),
        expect = chai.expect;

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

        it('should fail with an invalid type', function(done) {
            var errMsg = 'Invalid operation';

            expect(imgur._imgurRequest('blah', 'ysjVczY'))
                .to.be.rejectedWith(errMsg)
                .and.notify(done);
        });
    });
}());
