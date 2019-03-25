const { route, ControllerFactory } = require('simple-node-framework');
const server = require('../../../index.js');
const Controller = require('./controller');

// retreive route information
// ex: { baseRoute: '/api', module: 'customer', full: '/api/customer' }
const { full } = route.info(__filename);

server.get(`${full}/:name`, ControllerFactory.build(Controller, 'load'));
