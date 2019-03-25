const { BaseController } = require('simple-node-framework').Base;
const CustomerService = require('./service/customer-service');

// sample controller
class Controller extends BaseController {
    constructor() {
        super({
            module: 'My Sample Controller' // the module name will prefix all your logs
        });
        this.service = new CustomerService();
    }

    async load(req, res, next) {
        super.activateRequestLog(req); // this will automatically put the request-id on all logs

        const { name } = req.params;

        try {
            this.log.debug(`Loading customer [${name}]`);

            const customer = await this.service.loadByName(name);

            if (customer) res.send(200, customer);
            else res.send(404);

            return next();
        } catch (error) {
            this.log.error('Unexpected error on load', error);
            res.send(500, 'Unexpected error');
            return next();
        }
    }
}

module.exports = Controller;
