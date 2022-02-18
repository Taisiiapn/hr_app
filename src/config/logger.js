const {
    createLogger,
    transports,
    format
} = require('winston')
const { Pool } = require('pg')
const environment = require('./environment')
const { PostgresTransport } = require('winston-transport-pg')

const { port, host, user, password, database } = environment.db

const pool = new Pool({user,password,host,port,database});

const opts = {
    level: 'error',
    tableName: 'logs',
    format: format.combine(format.timestamp(), format.json())
};

const postgresTransport = new PostgresTransport(pool, opts);

const errorNames = {

    common: {
        UNKNOWN_ERROR: 'UNKNOWN_ERROR'
    },

    department: {
        DEPARTMENTS_RENDER: 'DEPARTMENTS_RENDER',
        DEPARTMENT_CREATE_RENDER: 'DEPARTMENT_CREATE_RENDER',
        DEPARTMENT_UPDATE_RENDER: 'DEPARTMENT_UPDATE_RENDER',
        DEPARTMENT_CREATE_ACTION: 'DEPARTMENT_CREATE_ACTION',
        DEPARTMENT_UPDATE_ACTION: 'DEPARTMENT_UPDATE_ACTION',
        DEPARTMENT_DELETE_ACTION: 'DEPARTMENT_DELETE_ACTION'
    },

    employee: {
        EMPLOYEES_RENDER: 'EMPLOYEES_RENDER',
        EMPLOYEE_CREATE_RENDER: 'EMPLOYEE_CREATE_RENDER',
        EMPLOYEE_UPDATE_RENDER: 'EMPLOYEE_UPDATE_RENDER',
        EMPLOYEE_CREATE_ACTION: 'EMPLOYEE_CREATE_ACTION',
        EMPLOYEE_UPDATE_ACTION: 'EMPLOYEE_UPDATE_ACTION',
        EMPLOYEE_DELETE_ACTION: 'EMPLOYEE_DELETE_ACTION'
    }
}

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

module.exports = {
    logger,
    errorNames
}