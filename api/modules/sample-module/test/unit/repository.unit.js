const { TestHelper } = require('simple-node-framework');
const { expect } = require('chai');
const sinon = require('sinon');
const repository = new (require('../../repository/customer-repository'));

describe('Customer Repository', () => {
    const sandbox = sinon.sandbox.create();
    let stubFind;

    before(() => {
        TestHelper.before();
    });

    after(() => {
        TestHelper.after();
    });

    beforeEach(() => {
        stubFind = sandbox.stub(repository.model, 'findOne').callsFake(nome => Promise.resolve({
            nome
        }));
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('Must find by name', (done) => {
        repository.findByName('some_name')
            .then(() => {
                expect(stubFind.calledOnce).to.be.ok;
                expect(stubFind.calledWith({
                    name: 'some_name'
                })).to.be.ok;
                done();
            })
            .catch(console.log);
    });
});
