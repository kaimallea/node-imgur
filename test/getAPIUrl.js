var imgur = require('../lib/imgur.js'),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    expect = chai.expect;

chai.use(chaiAsPromised);

describe('#getAPIUrl()', function() {
    it('should return the default API URL, if nothing is set', function() {
        var defaultAPIUrl = 'https://api.imgur.com/3/';
        return expect(imgur.getAPIUrl()).to.equal(defaultAPIUrl);
    });

    it('should return the same API URL that was set', function() {
        var apiUrl = 'https://imgur-apiv3.p.mashape.com/';
        imgur.setAPIUrl(apiUrl);

        return expect(imgur.getAPIUrl()).to.equal(apiUrl);
    });
});
