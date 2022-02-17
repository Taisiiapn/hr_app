const { Client } = require('pg')
const { Sequelize } = require('sequelize');
const { parseOptionalStringValueToColumnRecord, parseOptionalNumberValueToColumnRecord } = require('./utils')
const environment = require('../config/environment')
const { Employee, employeeWithViewValuesDTO, employeeDTO } = require('../model/employee.model')
const logger = require('../config/logger');
const { InternalError, BadRequestError } = require('../controller/utils');

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

    getEmployeesWithViewValues: (depId) => new Promise((resolve, reject) => {

        Employee.findAll({
            where: {
                departmentid: depId
            }
        })
        .then(allEmployees => {
            if (allEmployees.length === 0) {
                reject(new BadRequestError(`Employees not found!`))
            } else {
                resolve(allEmployees
                    .map(
                        employeeInstance => 
                            employeeWithViewValuesDTO(depId, employeeInstance)
                    )
                )
            }
        })
        .catch(error => {
            logger.error('getEmployeesWithViewValues service', error)
            reject(new InternalError())
        })

    }),

    getEmployeeById: (id) => new Promise((resolve, reject) => {

        Employee.findByPk(id)
        .then(employeeInstance => {

            if (employeeInstance.length === 0) {
                reject(new BadRequestError(`Employee with id - ${id}, nothing found!`))
            } else {
                const resultEmployeeValues = employeeDTO(employeeInstance)
                resolve(resultEmployeeValues)
            }
        })
        .catch(error => {
            logger.error('getEmployeeById service', error)
            reject(new InternalError())
        })

    }),

    addEmployee: (values) => new Promise((resolve, reject) => {

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
        .then(() => resolve())
        .catch(error => {
            logger.error('addEmployee service', error)
            reject(new InternalError())
        })
       
    }),

    editEmployee: (id, values) => new Promise((resolve, reject) => {

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
        .then(() => resolve())
        .catch(error => {
            logger.error('editEmployee service', error)
            reject(new InternalError())
        })
        
    }),

    deleteEmployee: (employeeId) => new Promise((resolve, reject) => {

        Employee.destroy({
            where: {
                id: employeeId
            }
        })
        .then(() => resolve())
        .catch(error => {
            logger.error('deleteEmployee service', error)
            reject(new InternalError())
        })
        
    }),

    isTheSameEmailExists: (values) => new Promise((resolve, reject) => {

        const { email } = values

        Employee.count({
            where: {
                email: email
            },
            distinct: true
        })
        .then(totalResult => resolve(totalResult))
        .catch(error => {
            logger.error(error)
            reject(new InternalError())
        })

    }),

    isTheSameEmailExistsWithDifferentId: (employeeId, values) => new Promise((resolve, reject) => {

        const { email } = values

        Employee.count({
            where: {
                email: email,
                id: { [Sequelize.Op.not]: employeeId }
            },
            distinct: true
        })
        .then(totalResult => resolve(totalResult))
        .catch(error => {
            logger.error('isTheSameEmailExistsWithDifferentId', error)
            reject(new InternalError())
        })
    })

}