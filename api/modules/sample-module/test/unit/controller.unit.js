const { TestHelper } = require('simple-node-framework');
const sinon = require('sinon');
const { expect } = require('chai');
const Controller = require('../../controller');

const controller = new Controller();

describe('Controller Test', () => {
    const sandbox = sinon.createSandbox();

    before(() => {
        TestHelper.before();
    });

    after(() => {
        TestHelper.after();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('Should return 200', (done) => {
        sandbox.stub(controller.service, 'loadByName').returns(
            Promise.resolve({
                name: 'some_name'
            })
        );

        const req = {
            params: {
                name: 'some_name'
            }
        };

        const res = {
            send: (code) => {
                expect(code).to.be.equal(200);
                done();
            }
        };

        controller.load(req, res, sinon.spy()).catch(done);
    });

    it('Should return customer', (done) => {
        sandbox.stub(controller.service, 'loadByName').returns(
            Promise.resolve({
                name: 'some_name'
            })
        );

        const req = {
            params: {
                name: 'some_name'
            }
        };

        const res = {
            send: (code, customer) => {
                expect(customer.name).to.be.equal('some_name');
                done();
            }
        };

        controller.load(req, res, sinon.spy()).catch(done);
    });
});
