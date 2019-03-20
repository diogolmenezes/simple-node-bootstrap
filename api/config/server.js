const { audit, Restify, cache } = require('simple-node-framework');

// You can extend simple-node-framework base server class if you need.
// Here you can manipulate restify middlewares order for exemple.
class Server extends Restify {
    applyMiddlewares() {
        super.applyMiddlewares();

        // Enabling application cache
        // The resolveKey is the key for your cache entry
        // this.server.use(cache.start({
        //     resolveKey: (req) => {
        //         return req.headers['your-key'];
        //     }
        // }));
    }

    // applyAudit() {
    //     audit.configure(this.server, (req, res, route, err) => {
    //         // console.log('Custom log for restify audit');
    //     });
    // }
}

const server = new Server();

module.exports = {
    restify: server.restify,
    server: server.configure()
};
