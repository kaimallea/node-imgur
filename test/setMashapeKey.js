var imgur = require('../lib/imgur.js'),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    expect = chai.expect;

chai.use(chaiAsPromised);

describe('#setMashapeKey()', function() {
    beforeEach(function() {
        var defaultMashapeKey = '0123456789abcdef';
        imgur.setMashapeKey(defaultMashapeKey);
    });

    it('should return the Mashape Key that was set', function() {
        var mashapeKey = '0123456789abcdef';
        imgur.setMashapeKey(mashapeKey);
        return expect(imgur.getMashapeKey()).to.equal(mashapeKey);
    });

    it('should not set an empty Mashape Key', function() {
        var mashapeKey = '';
        imgur.setMashapeKey(mashapeKey);
        return expect(imgur.getMashapeKey()).to.not.equal(mashapeKey);
    });

    it('should not set a number', function() {
        var mashapeKey = 1024;
        imgur.setMashapeKey(mashapeKey);
        return expect(imgur.getMashapeKey()).to.not.equal(mashapeKey);
    });

    it('should not set a boolean', function() {
        var mashapeKey = false;
        imgur.setMashapeKey(mashapeKey);
        return expect(imgur.getMashapeKey()).to.not.equal(mashapeKey);
    });
});