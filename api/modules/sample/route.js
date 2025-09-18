const { ControllerFactory } = require('simple-node-framework');
const { route } = require('simple-node-framework').Singleton;
const server = require('../../../index.js');
const Controller = require('./controller.js');

// retreive route information
// ex: { baseRoute: '/api', module: 'sample', full: '/api/sample' }
const { full } = route.info(__filename);

server.get(`${full}`, ControllerFactory.build(Controller, 'buscarPrevisaoDotempo'));
