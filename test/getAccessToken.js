var imgur = require('../lib/imgur.js'),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    expect = chai.expect;

chai.use(chaiAsPromised);

describe('#getAccessToken()', function() {
    it('should return the default access token, if nothing is set', function() {
        var defaultAccessToken = null;
        return expect(imgur.getAccessToken()).to.equal(defaultAccessToken);
    });

    it('should return the same access token that was set', function() {
        var accessToken = '747c289115605b93c3a9f2b126130eb53570e37b';
        imgur.setAccessToken(accessToken);

        return expect(imgur.getAccessToken()).to.equal(accessToken);
    });
});
