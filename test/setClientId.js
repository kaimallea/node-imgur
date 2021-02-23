var imgur = require('../lib/imgur.js'),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    expect = chai.expect;

chai.use(chaiAsPromised);

describe('#setClientId()', function() {
    beforeEach(function() {
        var defaultClientId = '0123456789abcdef';
        imgur.setClientId(defaultClientId);
    });

    it('should return the client id that was set', function() {
        var clientId = 'lolololol';
        imgur.setClientId(clientId);
        return expect(imgur.getClientId()).to.equal(clientId);
    });

    it('should not set an empty client id', function() {
        var clientId = '';
        imgur.setClientId(clientId);
        return expect(imgur.getClientId()).to.not.equal(clientId);
    });

    it('should not set a number', function() {
        var clientId = 1024;
        imgur.setClientId(clientId);
        return expect(imgur.getClientId()).to.not.equal(clientId);
    });

    it('should not set a boolean', function() {
        var clientId = false;
        imgur.setClientId(clientId);
        return expect(imgur.getClientId()).to.not.equal(clientId);
    });
});