const { BaseRest } = require('simple-node-framework').Base;
const { config } = require('simple-node-framework').Singleton;
const axios = require('axios');

class SampleRest extends BaseRest {
    constructor() {
        super({
            module: 'Sample Rest'
        });
        this.config = config;
    }

    async get() {
        const { host  } = this.config.integration.rest.sample;
        const url = `${host}/forecast?latitude=-22.9&longitude=-43.2&hourly=temperature_2m`;

        this.log.debug(`Recuperando a previsao do tempo [${url}]`);

        const timer = this.timer.start();

        try {
            const response = await axios.get(url);
            this.log.debug(`Previsao do tempo recuperada com sucesso [${url}]`);
            return response.data;
        } catch (error) {
            this.log.error(`Erro na integração para recuperar previsão do tempo [${url}]`, error);
            throw error;
        } finally {
            this.timer.writeLog(timer, 'Sample Rest - get');
        }
    }
}
module.exports = SampleRest;
