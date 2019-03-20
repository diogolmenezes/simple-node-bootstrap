const { TestHelper } = require('easy-framework');
const { expect } = require('chai');
const sinon = require('sinon');
const repository = new(require('../../repository/cliente-repository'));

describe('Cliente Repository', () => {
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

    describe('Cliente Repository', () => {
        it('Deve recuperar pelo nome', (done) => {
            repository.carregarPorNome('um_nome_qualquer')
                .then(() => {
                    expect(stubFind.calledOnce).to.be.ok;
                    expect(stubFind.calledWith({
                        nome: 'um_nome_qualquer'
                    })).to.be.ok;
                    done();
                })
                .catch(console.log);
        });
    });
});
