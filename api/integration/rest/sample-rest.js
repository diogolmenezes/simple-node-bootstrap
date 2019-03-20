const { config, BaseRest } = require('simple-node-framework');

// Classe de exemplo para chamadas de serviço REST
class SampleRest extends BaseRest {
    constructor() {
        super({
            module: 'SampleRest - REST'
        });

        this.config = config.integrations.rest.sampleRest;
    }

    doSomething() {
        this.log.debug(`Calling API SampleRest [${this.config.endpoint}]`);

        const headers = {
            'Content-Type': 'application/json'
        };

        const startDate = this.timer.start();

        return this.fetch(this.config.endpoint, { method: 'GET', headers, timeout: this.config.timeout * 1000 })
            .then((response) => {
                return this.responseHandler(response, false, [404, 400]);
            })
            .then((json) => {
                this.log.debug(`Response from API SampleRest`, json);
                this.timer.writeLog(startDate, 'SampleRest', '');
                return json;
            }).catch((erro) => {
                this.timer.writeLog(startDate, 'SampleRest', '');
                this.log.error(`Error from API SampleRest:`, erro);
                throw erro;
            });
    }
}

module.exports = SampleRest;
