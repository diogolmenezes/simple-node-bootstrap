const { config, BaseRest } = require('easy-framework');

// Classe de exemplo para chamadas de serviço REST
class MeuExemploRest extends BaseRest {
    constructor() {
        super({
            module: 'MeuExemplo - REST'
        });

        this.config = config.rest.meuExemploRest;
    }

    fazerAlgumaCoisa(cpf, terminal) {
        const url = `${this.config.url}/${terminal}`;

        this.log.debug(`Chamando API MeuExemplo REST [${terminal}] [${url}]`);

        const dadosHeader = {
            'Content-Type': 'application/json'
        };

        const dataEnvio = this.timer.start();

        return this.fetch(url, { method: 'GET', headers: dadosHeader, timeout: this.config.timeout * 1000 })
            .then((response) => {
                return this.responseHandler(response, false, [404, 400]);
            })
            .then((json) => {
                this.log.debug(`Resposta da API Meu Exemplo REST para o CPF [${cpf}] [${terminal}]`, json);
                this.timer.writeLog(dataEnvio, 'Meu Exemplo', `para o terminal [${terminal}]`);
                return json;
            }).catch((erro) => {
                this.timer.writeLog(dataEnvio, 'Meu Exemplo', `para o terminal [${terminal}]`);
                this.log.error(`Erro ao acessar a API Meu Exemplo REST: [${terminal}]`, erro);
                throw erro;
            });
    }
}

module.exports = MeuExemploRest;
