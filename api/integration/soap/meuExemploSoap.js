const { config, BaseSoap } = require('simple-node-framework');

// Classe de exemplo para chamadas de serviço REST
class SolicitarAberturaProtocolo extends BaseSoap {
    constructor() {
        super({
            module: 'Integracao - Solicitar Abertura Protocolo SOAP'
        });
        this.config = config.soap.SolicitarAberturaProtocolo;
        this.client = null;
        this.soap = new BaseSoap({
            module: 'SolicitarAberturaProtocolo'
        });
    }

    gerar(cpf, terminal, nome) {
        let _terminal = terminal;

        if (!_terminal) {
            _terminal = '00000000000';
            this.log.debug(`Geração de protocolo [${cpf}] sem terminal [${_terminal}]`);
        }

        const request = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
        xmlns:sol="http://alsb.telemar/xsd/SolicitarAberturaProtocolo"
        xmlns:esb="http://alsb.telemar/soap/esbUser">
           <soapenv:Header/>
           <soapenv:Body>
              <sol:SolicitarAberturaProtocoloRequest>
                 <esb:Ator>
                    <esb:nomeSolicitante>${nome.substr(0, 30)}</esb:nomeSolicitante>
                    <esb:sistema>17</esb:sistema>
                 </esb:Ator>
                 <terminal>${_terminal}</terminal>
                 <numDocumento>${cpf}</numDocumento>
                 <tipoServico>1</tipoServico>
              </sol:SolicitarAberturaProtocoloRequest>
           </soapenv:Body>
        </soapenv:Envelope>`;

        this.log.debug(`Chamando API de geração de protocolo [${cpf}] [${this.config.endpoint}]`, request);

        const dataEnvio = this.timer.start();

        return this.soap.send(this.config.endpoint, request, this.config.timeout)
            .then((response) => {
                try {
                    this.log.debug(`Resposta da API SolicitarAberturaDeProtocolo [${cpf}]`, response);

                    const protocolo = response['soapenv:Envelope']['S:Body'][0]['sol:SolicitarAberturaProtocoloResponse'][0].protocolo[0];

                    this.log.debug(`O protocolo foi gerado [${cpf}] [${protocolo}]`);

                    this.timer.writeLog(dataEnvio, 'SolicitarAberturaDeProtocolo', `para o cpf [${cpf}]`);

                    return protocolo;
                } catch (erro) {
                    this.log.error(`Erro ao gerar protocolo para o CPF [${cpf}]: formato não esperado`, { erro, request, response });
                    throw erro;
                }
            })
            .catch((erro) => {
                this.log.error(`Erro ao gerar protocolo para o CPF [${cpf}]: erro de acesso ao serviço`, { erro, request });
                this.timer.writeLog(dataEnvio, 'SolicitarAberturaDeProtocolo', `para o cpf [${cpf}]`);
                throw erro;
            });
    }
}

module.exports = SolicitarAberturaProtocolo;
