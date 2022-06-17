const EventEmitter = require('events');
const myEmitter = new EventEmitter();
const sequelize = require('../syncDB')
const { Client } = require('pg')
const environment = require('../config/environment');
const { Logs } = require('../model/logs');

const { host, user, password, database } = environment.db
// const { port, host, user, password, database } = environment.db

const client = new Client({
    user: user,
    password: password,
    host: host,
    // port: +port,
    database: database 
})

client.connect()


const events = {

    DEPARTMENT_VALIDATION_FAIL: 'DEPARTMENT_VALIDATION_FAIL',

    USER_VALIDATION_FAIL: 'USER_VALIDATION_FAIL',

    AUTH_VALIDATION_FAIL: 'AUTH_VALIDATION_FAIL'
}

myEmitter.on(events.AUTH_VALIDATION_FAIL, (error) => {

    sequelize.query(
        `INSERT INTO logs(level, message) VALUES ('info', '${error}');`,
        {  model: Logs}
    )

})

myEmitter.on(events.DEPARTMENT_VALIDATION_FAIL, (error) => {
    
    sequelize.query(
        `INSERT INTO logs(level, message) VALUES ('info', '${error}');`,
        {  model: Logs}
    )
    
})

myEmitter.on(events.USER_VALIDATION_FAIL, (error) => {

    sequelize.query(
        `INSERT INTO logs(level, message) VALUES ('info', '${error}');`,
        {  model: Logs}
    )

})

module.exports = {

    emitAuthFailedValidation: (error) => {
        myEmitter.emit(
            events.AUTH_VALIDATION_FAIL,
            error
        )
    },

    emitDepartmentFailedValidation: (error) => {
        myEmitter.emit(
            events.DEPARTMENT_VALIDATION_FAIL,
            error
        )
    },

    emitUserFailedValidation: (error) => {
        myEmitter.emit(
            events.USER_VALIDATION_FAIL,
            error
        )
    }

}