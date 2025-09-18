const { BaseService } = require('simple-node-framework').Base;
const CustomerRepository = require('../repository/customer-repository');
const SampleRest = require('../integration/sample-rest');


class SampleService extends BaseService {
    constructor() {
        super({
            module: 'Sample Service'
        });
        this.repository = new CustomerRepository();
        this.sampleRest = new SampleRest();
    }

    async loadByName(name) {
        this.log.debug(`Loading customer [${name}]`);
        return this.repository.loadByName(name);
    }

    async buscarPrevisaoDotempo() {
        this.log.debug('Buscando previsão do tempo');
        try {
            const forecast = await this.sampleRest.get();
            this.log.debug('Previsão do tempo obtida com sucesso');
            return forecast;
        } catch (error) {
            this.log.error('Erro ao buscar previsão do tempo', error);
            throw error;
        }
    }
}

module.exports = SampleService;
