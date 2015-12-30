var imgur = require('../lib/imgur.js'),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    expect = chai.expect;

chai.use(chaiAsPromised);

describe('#setAPIUrl()', function() {
    beforeEach(function() {
        var defaultImgurAPIUrl = 'https://api.imgur.com/3/';
        imgur.setAPIUrl(defaultImgurAPIUrl);
    });

    it('should return the API Url that was set', function() {
        var imgurAPIUrl = 'https://imgur-apiv3.p.mashape.com/';
        imgur.setAPIUrl(imgurAPIUrl);
        return expect(imgur.getAPIUrl()).to.equal(imgurAPIUrl);
    });

    it('should not set an empty API Url', function() {
        var imgurAPIUrl = '';
        imgur.setAPIUrl(imgurAPIUrl);
        return expect(imgur.getAPIUrl()).to.not.equal(imgurAPIUrl);
    });

    it('should not set a number', function() {
        var imgurAPIUrl = 1024;
        imgur.setAPIUrl(imgurAPIUrl);
        return expect(imgur.getAPIUrl()).to.not.equal(imgurAPIUrl);
    });

    it('should not set a boolean', function() {
        var imgurAPIUrl = false;
        imgur.setAPIUrl(imgurAPIUrl);
        return expect(imgur.getAPIUrl()).to.not.equal(imgurAPIUrl);
    });
});