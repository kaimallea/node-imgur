var imgur = require('../lib/imgur.js'),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    expect = chai.expect;

chai.use(chaiAsPromised);

describe('#setAccessToken()', function() {
    beforeEach(function() {
        var defaultAccessToken = '747c289115605b93c3a9f2bcc6130eb53570e37b';
        imgur.setAccessToken(defaultAccessToken);
    });

    it('should return the access token that was set', function() {
        var imgurAccessToken = '747c289115605b93c3a9f2b126130eb53570e37b';
        imgur.setAccessToken(imgurAccessToken);
        return expect(imgur.getAccessToken()).to.equal(imgurAccessToken);
    });

    it('should not set an empty access token', function() {
        var imgurAccessToken = '';
        imgur.setAccessToken(imgurAccessToken);
        return expect(imgur.getAccessToken()).to.not.equal(imgurAccessToken);
    });

    it('should not set a number', function() {
        var imgurAccessToken = 1024;
        imgur.setAccessToken(imgurAccessToken);
        return expect(imgur.getAccessToken()).to.not.equal(imgurAccessToken);
    });

    it('should not set a boolean', function() {
        var imgurAccessToken = false;
        imgur.setAccessToken(imgurAccessToken);
        return expect(imgur.getAccessToken()).to.not.equal(imgurAccessToken);
    });
});