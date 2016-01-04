/**
 * Created by We-Smart on 2016/2/27.
 */
describe('eventEmitter', function() {
    var should = chai.should();
    it('check it property', function() {
        var ee = new eventEmitter();
        ee.should.have.property('once').with.a('function');
        ee.should.have.property('on').with.a('function');
        ee.should.have.property('get').with.a('function');
        ee.should.have.property('trigger').with.a('function');
        ee.should.have.property('off').with.a('function');
    });

});
