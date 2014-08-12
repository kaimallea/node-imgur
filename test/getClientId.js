var imgur = require('../lib/imgur.js'),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    expect = chai.expect;

chai.use(chaiAsPromised);

describe('#getClientId()', function() {
    it('should return the default client id, if nothing is set', function() {
        var defaultClientId = 'f0ea04148a54268'
        return expect(imgur.getClientId()).to.equal(defaultClientId);
    });

    it('should return the same client that was set', function() {
        var clientId = '123456789abcdef';
        imgur.setClientId(clientId);

        return expect(imgur.getClientId()).to.equal(clientId);
    });
});
