const { route, ControllerFactory } = require('simple-node-framework');
const { server } = require('../../config/server');
const Controller = require('./controller');
const authorization = require('../../config/custom-authorization');

// Through the info object we obtain information that allows us to be flexible to create more elegant and meaningful routes:
// { base: '/api', module: 'sample-module', full: '/api/sample-module' }
const { full } = route.info(__filename);

server.get(`${full}/:name`, authorization.protect.bind(authorization), ControllerFactory.build(Controller, 'load'));
