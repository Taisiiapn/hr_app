const { Client } = require('pg')
const { Sequelize } = require('sequelize');
const { parseOptionalStringValueToColumnRecord, parseOptionalNumberValueToColumnRecord } = require('./utils')
const environment = require('../config/environment')
const { Employee, employeeWithViewValuesDTO, employeeDTO } = require('../model/employee.model')
const logger = require('../config/logger')

const { port, host, user, password, database } = environment.db

const client = new Client({
    user: user,
    password: password,
    host: host,
    port: +port,
    database: database
})

client.connect()

module.exports = {

    getEmployeesWithViewValues: (depId, cb) => {

        Employee.findAll({
            where: {
                departmentid: depId
            }
        })
        .then(allEmployees => {
            cb(null, allEmployees
                .map(employeeInstance => employeeWithViewValuesDTO(depId, employeeInstance)))
        })
        .catch(error => {
            cb(new Error('internal server error'))
            logger.error(error)
        })

    },

    getEmployeeById: (id, cb) => {

        Employee.findByPk(id)
        .then(employeeInstance => {

            if (employeeInstance.length === 0) {
                cb(new Error(`Employee with id - ${id}, nothing found!`))
            } else {
                const resultEmployeeValues = employeeDTO(employeeInstance)
                cb(null, resultEmployeeValues)
            }
        })
        .catch(error => {
            cb(new Error('internal server error'))
            logger.error(error)
        })

    },

    addEmployee: (values, cb) => {

        const { name, salary, departmentid, birthday, email } = values

        const salaryParsed = parseOptionalNumberValueToColumnRecord(salary)
        const birthdayParsed = parseOptionalStringValueToColumnRecord(birthday)

        Employee.create({
            name: name,
            salary: salaryParsed,
            departmentid: departmentid,
            birthday: birthdayParsed,
            email: email
        })
        .then(() => {
            cb(null)
        })
        .catch(error => {
            cb(new Error('internal server error'))
            logger.error(error)
        })
       
    },

    editEmployee: (id, values, cb) => {

        const { name, salary, birthday, email } = values
        
        const salaryParsed = parseOptionalNumberValueToColumnRecord(salary)
        const birthdayParsed = parseOptionalStringValueToColumnRecord(birthday)
        
        Employee.update({
            name: name,
            salary: salaryParsed,
            birthday: birthdayParsed,
            email: email
        }, {
            where: {
                id: id
            }
        })
        .then(() => {
            cb(null)
        })
        .catch(error => {
            cb(new Error('internal server error'))
            logger.error('editEmployee Service', error)
        })
        
    },

    deleteEmployee: (employeeId, cb) => {

        Employee.destroy({
            where: {
                id: employeeId
            }
        })
        .then(() => {
            cb(null)
        })
        .catch(error => {
            cb(new Error('internal server error'))
            logger.error(error)
        })
        
    },

    isTheSameEmailExists: (values, cb) => {

        const { email } = values

        Employee.findAll({
            where: {
                email: email
            }
        })
        .then(allEmployees => {
            if(allEmployees.length !== 0) {
                cb(null, true)
            } else {
                cb(null, false)
            }
        })
        .catch(error => {
            cb(new Error('internal server error'))
            logger.error(error)
        })

    },

    isTheSameEmailExistsWithDifferentId: (employeeId, values, cb) => {

        const { email } = values

        Employee.findAll({
            where: {
                email: email,
                id: { [Sequelize.Op.not]: employeeId }
            }
        })
        .then(allEmployees => {
            if(allEmployees.length !== 0) {
                cb(null, true)
            } else {
                cb(null, false)
            }
        })
        .catch(error => {
            cb(new Error('internal server error'))
            logger.error('isTheSameEmailExistsWithDifferentId', error)
        })
    }

}