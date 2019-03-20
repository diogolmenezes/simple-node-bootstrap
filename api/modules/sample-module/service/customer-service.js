const { BaseService } = require('simple-node-framework');
const CustomerRepository = require('../repository/customer-repository');

class CustomerService extends BaseService {
    constructor() {
        super({
            module: 'Customer Service'
        });
        this.repository = new CustomerRepository;
    }

    findByName(name) {
        this.log.debug(`Searching customer by name [${name}]`);
        return this.repository.findByName(name);
    }
}

module.exports = CustomerService;
