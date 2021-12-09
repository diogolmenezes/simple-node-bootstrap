module.exports = {
    app: {
        name: 'my-application',
        baseRoute: '/api',
        port: process.env.SNF_MY_APPLICATION_PORT || 8090 // you can use environment variables
    },
    cors: {
        preflightMaxAge: 5,
        origins: [
            '*'
        ],
        allowHeaders: [
            'x-origin-channel',
            'x-origin-application',
            'x-origin-device',
            'x-identifier'
        ],
        exposeHeaders: []
    },
    db: {
        mongodb: {
            application: {
                url: 'mongodb://localhost:27017/my-application',
                options: {
                    poolSize: 10,
                    keepAlive: 300000,
                    useNewUrlParser: true,
                    autoReconnect: true,
                    reconnectInterval: 60000,
                    reconnectTries: 1440,
                    connectTimeoutMS: 30000
                }
            }
        }
    },
    redis: {
        host: 'localhost',
        ttl: 86400,
        port: 6379
    },
    cache: {
        enabled: true,
        ttl: 1800,
        headerKey: 'x-identifier'
    },
    session: {
        prefix: 'myapplication',
        headerKey: 'x-identifier',
        ttl: 3600
    },
    log: {
        debug: true,
        bunyan: {
            name: 'Application',
            streams: [
                {
                    level: 'debug',
                    type: 'rotating-file',
                    path: 'logs/{hostname}.log',
                    period: '1d',
                    count: 2
                }
            ]
        }
    },
    authorization: {
        enabled: true,
        basic: {
            users: [
                {
                    username: 'admin',
                    password: 'admin'
                }
            ]
        }
    },
    origin: {
        ignoreExact: [
            '/'
        ],
        ignore: [
            '/doc/'
        ],
        require: {
            application: true,
            channel: true,
            device: false
        }
    }
};
