const { Authorization } = require('simple-node-framework');

// You can extend simple-node-framework base authorization class if you need.
class CustomAuthorization extends Authorization {
    constructor() {
        super({
            module: 'SNF Authorization'
        });
    }

    // Custom authentication sample
    // bearerValidate(req, res, next) {
    //     super.bearerValidate(req, res, next);
    //     ... your custom code ...
    // }
}

module.exports = new CustomAuthorization();
