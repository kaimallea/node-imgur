var imgur = require('../lib/imgur.js'),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    sinon = require('sinon'),
    sinonChai = require("sinon-chai"),
    Q = require('q'),
    expect = chai.expect;

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('#uploadUrl()', function() {
    describe('validation', function() {

      it('should fail with no url', function(done) {
          var errMsg = 'Invalid URL';

          expect(imgur.uploadUrl())
              .to.be.rejectedWith(errMsg)
              .and.notify(done);
      });

      it('should fail with on a malformed url', function(done) {
          var errMsg = 'Invalid URL';

          expect(imgur.uploadUrl("blarg"))
              .to.be.rejectedWith(errMsg)
              .and.notify(done);
      });
    });

    describe('delegates to #_imgurRequest(\'upload\', ...)', function() {
      var mockResult = { foo: 'bar'};
      var testUrl = "https://somewhere/test.png";

      beforeEach(function() {
        var deferred = Q.defer();
        sinon.stub(imgur, "_imgurRequest").returns(deferred.promise);
        deferred.resolve(mockResult);
      });

      afterEach(function () {
        imgur._imgurRequest.restore();
      });

      it('should delegate', function(done) {
        var promise = imgur.uploadUrl(testUrl);

        expect(imgur._imgurRequest)
            .to.have.been.calledWith('upload', testUrl);
        expect(promise)
            .to.eventually.equal(mockResult)
            .and.notify(done);
      });

      it('should propagate albumId', function(done) {
        var albumId = '123';
        var promise = imgur.uploadUrl(testUrl, albumId);

        expect(imgur._imgurRequest)
            .to.have.been.calledWith('upload', testUrl, {album: albumId});
        expect(promise)
            .to.eventually.equal(mockResult)
            .and.notify(done);
      });
    });
});
