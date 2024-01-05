module.exports = {
    app: {
        name: 'my-application',
        baseRoute: '/api',
        port: process.env.SNF_MY_APPLICATION_PORT || 8090 // you can use environment variables
    },
    cors: {
        origin: '*',
        allowedHeaders: [
            'x-origin-channel',
            'x-origin-application',
            'x-origin-device',
            'x-identifier'
        ],
        methods: ['GET', 'POST', 'PATCH', 'PUT', 'OPTIONS'],
        credentials: true
    },
    db: {
        mongodb: {
            application: {
                url: process.env.MONGO_CONNECTION_STRING,
                options: {
                    user: process.env.MONGO_USER,
                    pass: process.env.MONGO_PASSWORD,
                    minPoolSize: 5,
                    maxPoolSize: 10
                }
            },
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
        debug: false,
        requestResponse: {
            enabled: true,
            logResponseTime: true,
            ignore: [
                '/'
            ],
            bodyCallback: body => {
                // if you need to remove any information from the request log, do it here.
                return body;
            },
            headerCallback: body => {
                // if you need to remove any information from the request log, do it here.
                return body;
            }
        },
        bunyan: {
            name: 'Application',
            streams: [
                {
                    level: 'debug',
                    stream: 'process.stdout'
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
