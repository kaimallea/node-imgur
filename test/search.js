var imgur = require('../lib/imgur.js'),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    expect = chai.expect,
    Q = require('q'),
    sinon = require('sinon'),
    sinonChai = require("sinon-chai")

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('SEARCH', function() {

  describe('search options validations', function() {

    it('should fail when options are not an object', function(done) {
      var sortOptions = "sort: Accepts 'time', 'viral', or 'top' as a value. Defaults to top."
      var dateRangeOptions = "dateRange: Accepts 'day', 'week', 'month', 'year', or 'all' as a value. Defaults to all."
      var pageOptions = "page: Accepts an integer (e.g. 1, 2, 3, 4) as a value. Defaults to 1."
      var helpMsg = "\n" + sortOptions + "\n" + dateRangeOptions + "\n" + pageOptions
      errMsg = 'You did not pass an object to options. Pass in an object of options, or an empty object {} to return the default parameters.' + "\n" + helpMsg
      expect(imgur.search('meme', [])).to.be.rejectedWith(errMsg).and.notify(done)
    })

    it('should fail when query is not passed', function(done) {
      var errMsg = "Search requires a query. Try searching with a query (e.g cats)."
      expect(imgur.search()).to.be.rejectedWith(errMsg).and.notify(done)
    })

    it('should fail when query is passed a boolean', function(done) {
      var errMsg = "You did not pass a string as a query."
      expect(imgur.search(true)).to.be.rejectedWith(errMsg).and.notify(done)
    }) 

    it('should fail when query is passed a number', function(done) {
      var errMsg = "You did not pass a string as a query."
      expect(imgur.search(1)).to.be.rejectedWith(errMsg).and.notify(done)
    }) 

    it('should fail when query is passed a number', function(done) {
      var errMsg = "You did not pass a string as a query."
      expect(imgur.search(1)).to.be.rejectedWith(errMsg).and.notify(done)
    }) 
  })



  describe('delegates to #_imgurRequest(\'search\', ...)', function() {
    var mockResult = { 
      "data": [],
      "params": {
        "page": "1",
        "dateRange": "month",
        "sort": "viral"
      }
    };
    var payload = "/viral/month/1?q=meme";

    beforeEach(function() {
      var deferred = Q.defer();
      sinon.stub(imgur, "_imgurRequest").returns(deferred.promise);
      deferred.resolve(mockResult);
    });

    afterEach(function () {
      imgur._imgurRequest.restore();
    });

    it('should delegate', function(done) {
      var promise = imgur.search('meme', {sort: "viral", dateRange: 'month', page: '1'});

      expect(imgur._imgurRequest)
        .to.have.been.calledWith('search', payload)
      expect(promise)
        .to.eventually.deep.equal(mockResult).and.notify(done)
    });
  });
})