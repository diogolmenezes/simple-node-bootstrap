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
