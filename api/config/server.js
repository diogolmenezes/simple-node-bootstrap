const { audit, Restify, cache } = require('easy-framework');

// Classe customizada para extender as configurações basicas do restify do framework
class Server extends Restify {
    applyMiddlewares() {
        super.applyMiddlewares();

        // Habilitando o cache
        // this.server.use(cache.start({
        //     resolveKey: (req) => {
        //         return req.headers['x-cpf'];
        //     }
        // }));
    }

    // applyAudit() {
    //     audit.configure(this.server, (req, res, route, err) => {
    //         // console.log('Log customizado de auditoria');
    //     });
    // }
}

const server = new Server();

module.exports = {
    restify: server.restify,
    server: server.configure()
};
