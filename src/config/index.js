const path = require('path');

require('dotenv').config({
    path: path.join(__dirname, '../../.env')
});

module.exports = {
    appName: process.env.APP_NAME,
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    jwt: {
        secret: process.env.JWT_SECRET
    },
    cors: {
        origin: '*',
        maxAge: 3600
    },
    // config for database
    db: {
        development: {
            client: process.env.DB_CONNECTION,
            connection: {
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE
            },
            migrations: {
                tableName: 'migrations',
                directory: '../database/migrations'
            },
            seeds: {
                directory: '../database/seeds'
            }
        }
    },
    elastic: {
        enabled: process.env.ELASTIC_ENABLED,
        node: process.env.ELASTIC_NODE,
        prefix: process.env.APP_NAME
    }
}