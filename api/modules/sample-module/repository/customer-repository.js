const { BaseRepository } = require('simple-node-framework').Base;
const customerModel = require('../model/customer');


// sample repository
class CustomerRepository extends BaseRepository {
    constructor() {
        super({
            module: 'Customer Repository' // the module name will prefix all your logs
        });
        this.model = customerModel;
    }

    async loadByName(name) {
        this.log.debug(`Loading customer [${name}]`);
        return this.model.findOne({ name });
    }
}

module.exports = CustomerRepository;
