const { applicationError, BaseController } = require('simple-node-framework');
const CustomerService = require('./service/customer-service');

class CustomerController extends BaseController {
    constructor() {
        super({
            module: 'Customer Controller'
        });
        this.service = new CustomerService;
    }

    load(req, res, next) {
        super.activateRequestLog(req);

        const { name } = req.params;

        this.log.debug(`Searching customer by name [${name}]`);

        if (!name) {
            return next(applicationError.throw('[load] Required fields not filled in', 'BadRequestError'));
        }

        return this.service.findByName(name)
            .then((customer) => {
                if (!customer) {
                    return next(applicationError.throw(`Customer [${name}] not found.`, 'NotFoundError'));
                }

                this.log.debug(`Customer was loaded [${customer}]`);

                res.send(200, customer);

                return next();
            })
            .catch(erro => next(applicationError.throw(erro)));
    }
}

module.exports = CustomerController;
