const { Authorization } = require('easy-framework');

// Classe customizada de autorização extendendo a classe padrao de autorização do framework
class CustomAuthorization extends Authorization {
    constructor() {
        super({
            module: 'Authorization'
        });
    }

    // Autenticação customizada
    // bearerValidate(req, res, next) {
    //     super.bearerValidate(req, res, next);
    // }
}

module.exports = new CustomAuthorization();
