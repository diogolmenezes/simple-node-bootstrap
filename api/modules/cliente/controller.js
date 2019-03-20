const { applicationError, BaseController } = require('easy-framework');
const ClienteService = require('./service/cliente-service');

class ClienteController extends BaseController {
    constructor() {
        super({
            module: 'Cliente Controller'
        });
        this.service = new ClienteService;
    }

    carregar(req, res, next) {
        super.activateRequestLog(req);

        const { nome } = req.params;

        this.log.debug(`Chamando consulta de um cliente por nome [${nome}]`);

        if (!nome) {
            return next(applicationError.throw('[carregar] Campos obrigatórios não preenchidos.', 'BadRequestError'));
        }

        return this.service.carregarPorNome(nome)
            .then((cliente) => {
                if (!cliente) {
                    return next(applicationError.throw(`O Cliente [${nome}] não foi encontrado.`, 'NotFoundError'));
                }

                this.log.debug(`O cliente foi carregado com sucesso [${cliente}]`);

                res.send(200, cliente);

                return next();
            })
            .catch(erro => next(applicationError.throw(erro)));
    }
}

module.exports = ClienteController;
