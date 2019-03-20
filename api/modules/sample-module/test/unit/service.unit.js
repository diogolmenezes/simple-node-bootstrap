const { TestHelper } = require('simple-node-framework');
const { expect } = require('chai');
const sinon = require('sinon');
const service = new(require('../../service/customer-service'));

describe('Customer Sevice', () => {
    const sandbox = sinon.sandbox.create();
    let stubFindByName;

    before(() => {
        TestHelper.before();
    });

    after(() => {
        TestHelper.after();
    });

    beforeEach(() => {
        stubFindByName = sandbox.stub(service.repository, 'findByName').callsFake(() => Promise.resolve());
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('Carregar por nome', () => {
        it('Must have findByName method', (done) => {
            expect(service).to.have.property('findByName');
            done();
        });

        it('Must find by name', (done) => {
            service.findByName('some_name')
                .then(() => {
                    expect(stubFindByName.calledOnce).to.be.ok;
                    expect(stubFindByName.calledWith('some_name')).to.be.ok;
                    done();
                });
        });
    });
});
