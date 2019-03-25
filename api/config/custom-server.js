const { Server } = require('simple-node-framework');

class CustomServer extends Server {
    constructor() {
        super({
            module: 'SNF Custom Server'
        });
    }
}

const server = new CustomServer().configure();

module.exports = server;
