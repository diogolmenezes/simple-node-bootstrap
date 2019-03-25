const { Server } = require('simple-node-framework');

class CustomServer extends Server {
    constructor() {
        super({
            module: 'SNF Custom Server'
        });
    }
}

const customServer = new CustomServer();
const server = customServer.configure();

module.exports = {
    server,
    baseServer: customServer.baseServer
};
