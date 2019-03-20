const { BaseService } = require('easy-framework');
const ClienteRepository = require('../repository/cliente-repository');

class ClienteService extends BaseService {
    constructor() {
        super({
            module: 'Cliente Service'
        });
        this.repository = new ClienteRepository;
    }

    carregarPorNome(nome) {
        this.log.debug(`Chamando consulta de um cliente por nome [${nome}]`);
        return this.repository.carregarPorNome(nome);
    }
}

module.exports = ClienteService;
