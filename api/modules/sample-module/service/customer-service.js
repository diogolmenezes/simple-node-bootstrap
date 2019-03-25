const { BaseService } = require('simple-node-framework').Base;
const CustomerRepository = require('../repository/customer-repository');


// sample service
class CustomerService extends BaseService {
    constructor() {
        super({
            module: 'Customer Service' // the module name will prefix all your logs
        });
        this.repository = new CustomerRepository();
    }

    async loadByName(name) {
        this.log.debug(`Loading customer [${name}]`);
        return this.repository.loadByName(name);
    }
}

module.exports = CustomerService;
