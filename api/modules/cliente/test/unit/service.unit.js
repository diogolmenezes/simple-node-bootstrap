const { TestHelper } = require('easy-framework');
const { expect } = require('chai');
const sinon = require('sinon');
const service = new(require('../../service/cliente-service'));

describe('Cliente Sevice', () => {
    const sandbox = sinon.sandbox.create();
    let stubCarregarPorNome;

    before(() => {
        TestHelper.before();
    });

    after(() => {
        TestHelper.after();
    });

    beforeEach(() => {
        stubCarregarPorNome = sandbox.stub(service.repository, 'carregarPorNome').callsFake(() => Promise.resolve());
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('Carregar por nome', () => {
        it('Deve possuir método de carregar por nome', (done) => {
            expect(service).to.have.property('carregarPorNome');
            done();
        });

        it('Deve carregar por nome', (done) => {
            service.carregarPorNome('um_nome_qualquer')
                .then(() => {
                    expect(stubCarregarPorNome.calledOnce).to.be.ok;
                    expect(stubCarregarPorNome.calledWith('um_nome_qualquer')).to.be.ok;
                    done();
                });
        });
    });
});
