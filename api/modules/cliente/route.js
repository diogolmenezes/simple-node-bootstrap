const { route, ControllerFactory } = require('easy-framework');
const { server } = require('../../config/server');
const Controller = require('./controller');
const autorizacao = require('../../config/custom-authorization');

// Através do objeto info obtemos informações que nos possibilitam ser flexiveis para criar rotas mais elegantes e significativas:
// { base: '/my-application', module: 'cliente', full: '/my-application/cliente' }
const { full } = route.info(__filename);

server.get(`${full}/:nome`, autorizacao.protect.bind(autorizacao), ControllerFactory.build(Controller, 'carregar'));
