const EventEmitter = require('events');
const myEmitter = new EventEmitter();
const { sequelize } = require('../model/department.model')
const { Client } = require('pg')
const environment = require('../config/environment');
const { Logs } = require('../model/logs.model');

const { port, host, user, password, database } = environment.db

const client = new Client({
    user: user,
    password: password,
    host: host,
    port: +port,
    database: database 
})

client.connect()

function departmentToSQL_DTO (values) {
    // todo from js object to sql query values

    values
} 

function emoployeeToSQL_DTO (values) {
    
    values
} 


const events = {

    DEPARTMENT_VALIDATION_FAIL: 'DEPARTMENT_VALIDATION_FAIL',

    EMPLOYEE_VALIDATION_FAIL: 'EMPLOYEE_VALIDATION_FAIL',
}

myEmitter.on(events.DEPARTMENT_VALIDATION_FAIL, async (error) => {
    
    await sequelize.query(
        `INSERT INTO logs(level, message) VALUES ('info', '${error}');`,
        {  model: Logs}
    )
    
})

myEmitter.on(events.EMPLOYEE_VALIDATION_FAIL, async (error) => {

    await sequelize.query(
        `INSERT INTO logs(level, message) VALUES ('info', '${error}');`,
        {  model: Logs}
    )

})

module.exports = {

    emitDepartmentFailedValidation: (error) => {
        myEmitter.emit(
            events.DEPARTMENT_VALIDATION_FAIL,
            error
        )
    },

    emitEmployeeFailedValidation: (error) => {
        myEmitter.emit(
            events.EMPLOYEE_VALIDATION_FAIL,
            error
        )
    }

}