const { BaseController } = require('simple-node-framework').Base;
const SampleService = require('../../service/sample-service');

// sample controller
class Controller extends BaseController {
    constructor() {
        super({
            module: 'My Sample Controller' // Isso vai prefixar todos os logs
        });
        this.service = new SampleService();
    }

    async buscarPrevisaoDotempo(req, res, next) {
        super.activateRequestLog(req); // Isso vai automaticamente colocar o request-id em todos os logs
        try {
            this.log.debug('Buscando previsão do tempo');

            const forecast = await this.service.buscarPrevisaoDotempo();

            this.log.debug('Previsão do tempo obtida com sucesso');
            res.send(200, forecast);

            return next();
        } catch (error) {
            this.log.error('Erro inesperado ao buscar previsão do tempo', error);
            res.send(500, { error: 'Erro inesperado ao buscar previsão do tempo' });
            return next();
        }
    }
}

module.exports = Controller;
