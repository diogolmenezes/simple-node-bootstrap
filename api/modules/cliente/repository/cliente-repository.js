const { BaseRepository } = require('easy-framework');
const clienteModel = require('../model/cliente');

class ClienteRepository extends BaseRepository {
    constructor() {
        super({
            module: 'Cliente Repository'
        });

        this.model = clienteModel;
    }

    carregarPorNome(nome) {
        this.log.debug(`Chamando consulta de um cliente por nome [${nome}]`);
        return this.model.findOne({
            nome
        });
    }
}

module.exports = ClienteRepository;
