const { BaseRepository } = require('simple-node-framework');
const customerModel = require('../model/customer');

class CustomerRepository extends BaseRepository {
    constructor() {
        super({
            module: 'Customer Repository'
        });

        this.model = customerModel;
    }

    findByName(name) {
        this.log.debug(`Searching customer by name [${name}]`);
        return this.model.findOne({
            name
        });
    }
}

module.exports = CustomerRepository;
