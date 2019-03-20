const { server, restify } = require('./api/config/server');
const { config, route, applicationError, redis, logger, database } = require('easy-framework');

// iniciando o servidor web
server.listen(config.app.port, () => {
    logger.debug('Aplicação', `A aplicação está rodando em modo [${config.app.env}] na porta [${config.app.port}].`);

    // iniciando a conexão com o banco de dados
    database.connect();

    // importando as rotas de todos os modulos da aplicação contidos na pasta modules
    route.importModuleRoutes();

    // Iniciando a conexão com o Redis
    redis.configure();
});

// repassa todos os erros para o handler padrão da aplicação
server.on('restifyError', applicationError.handle.bind(applicationError));

// finaliza a conexão com o banco sempre que o restify for finalizado
server.on('close', () => {
    logger.debug('Aplicação', 'O Servidor do restify foi finalizado.');
    database.close();
    if (redis.connected) redis.client.quit();
});

// finaliza a aplicação e todas as suas conexões
process.on('SIGINT', () => {
    server.close();
});

// exceções nao tratadas
process.on('uncaughtException', (err) => {
    console.log(err);
    logger.debug('Uncaught Exception', 'Um erro não tratado foi encontrado', { err });
});

// configurando rota de health check
server.get('/', (req, res, next) => {
    res.send(`${config.app.name} está rodando.`);
    next();
});

// configurando rota para o swagger
server.get(/\/doc\/?.*/, restify.plugins.serveStatic({
    default: 'index.html',
    directory: __dirname
}));

module.exports = server;
