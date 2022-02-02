const {
    createLogger,
    transports,
    format
} = require('winston')
const { Pool } = require('pg')
const environment = require('../config/environment')
const { PostgresTransport } = require('winston-transport-pg')

const { port, host, user, password, database } = environment.db

const pool = new Pool({user,password,host,port,database});

const opts = {
    level: 'error',
    tableName: 'logs',
    format: format.combine(format.timestamp(), format.json())
};

const postgresTransport = new PostgresTransport(pool, opts);

const logger = createLogger({
    format: format.combine(format.timestamp(), format.json()),
    level: 'info',
    transports: [
        new transports.File({
            filename: 'info.log'
        }),

        postgresTransport,

        new transports.Console()
    ]
})

module.exports = logger