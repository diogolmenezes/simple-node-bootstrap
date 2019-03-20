const sinon = require('sinon');
const controller = new (require('../../controller'));
const { TestHelper } = require('easy-framework');
const { expect } = require('chai');

describe('Cliente Controller', () => {
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

    it('Deve retornar 200 e carregar cliente por nome', (done) => {
        sandbox.stub(controller.service, 'carregarPorNome').returns(Promise.resolve({
            nome: 'um_nome_qualquer'
        }));

        const req = {
            params: {
                nome: 'um_nome_qualquer'
            }
        };

        const res = {
            send: (code, cliente) => {
                expect(code).to.be.equal(200);
                expect(cliente.nome).to.be.equal('um_nome_qualquer');
                done();
            }
        };

        controller.carregar(req, res, sinon.spy());
    });
});
