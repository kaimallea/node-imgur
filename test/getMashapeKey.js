var imgur = require('../lib/imgur.js'),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    expect = chai.expect;

chai.use(chaiAsPromised);

describe('#getMashapeKey()', function() {
    it('should return the same client that was set', function() {
        var mashapeKey = '123456789abcdef';
        imgur.setMashapeKey(mashapeKey);

        return expect(imgur.getMashapeKey()).to.equal(mashapeKey);
    });
});
