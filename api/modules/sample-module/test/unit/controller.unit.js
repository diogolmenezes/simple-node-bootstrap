const sinon = require('sinon');
const controller = new (require('../../controller'));
const { TestHelper } = require('simple-node-framework');
const { expect } = require('chai');

describe('Customer Controller', () => {
    const sandbox = sinon.sandbox.create();

    before(() => {
        TestHelper.before();
    });

    after(() => {
        TestHelper.after();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('Must return 200 and load the customer by name', (done) => {
        sandbox.stub(controller.service, 'findByName').returns(Promise.resolve({
            name: 'some_name'
        }));

        const req = {
            params: {
                name: 'some_name'
            }
        };

        const res = {
            send: (code, customer) => {
                expect(code).to.be.equal(200);
                expect(customer.name).to.be.equal('some_name');
                done();
            }
        };

        controller.load(req, res, sinon.spy());
    });
});
