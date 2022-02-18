const { Client } = require('pg')
const { Sequelize } = require('sequelize');
const { parseOptionalStringValueToColumnRecord, parseOptionalNumberValueToColumnRecord } = require('./utils')
const environment = require('../config/environment')
const { Employee, employeeWithViewValuesDTO, employeeDTO } = require('../model/employee.model')
const { logger } = require('../config/logger');
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

    getEmployeesWithViewValues: async (depId) => {

        try {

            const allEmployees = await Employee.findAll({
                where: {
                    departmentid: depId
                }
            })
           
            return allEmployees
                .map(
                    employeeInstance => 
                        employeeWithViewValuesDTO(depId, employeeInstance)
                )

        } catch(error) {

            logger.error('getEmployeesWithViewValues service', error)
            new InternalError()
        }

    },

    getEmployeeById: async (id) => {

        try {

            const employeeInstance = await Employee.findByPk(id)

            if (employeeInstance.length === 0) {
                return new BadRequestError(`Employee with id - ${id}, nothing found!`)
            } else {
                const resultEmployeeValues = employeeDTO(employeeInstance)
                return resultEmployeeValues
            }

        } catch(error) {
            logger.error('getEmployeeById service', error)
            new InternalError()
        }

    },

    addEmployee: async (values) => {

        try {

            const { name, salary, departmentid, birthday, email } = values

            const salaryParsed = parseOptionalNumberValueToColumnRecord(salary)
            const birthdayParsed = parseOptionalStringValueToColumnRecord(birthday)

            await Employee.create({
                name: name,
                salary: salaryParsed,
                departmentid: departmentid,
                birthday: birthdayParsed,
                email: email
            })
        } catch(error) {
            logger.error('addEmployee service', error)
            new InternalError()
        }
       
    },

    editEmployee: async (id, values) => {

        try {

            const { name, salary, birthday, email } = values
        
            const salaryParsed = parseOptionalNumberValueToColumnRecord(salary)
            const birthdayParsed = parseOptionalStringValueToColumnRecord(birthday)
            
            await Employee.update({
                name: name,
                salary: salaryParsed,
                birthday: birthdayParsed,
                email: email
            }, {
                where: {
                    id: id
                }
            })
            
        } catch(error) {

            logger.error('editEmployee service', error)
            new InternalError()

        }
        
    },

    deleteEmployee: async (employeeId) => {

        try {

            await Employee.destroy({
                where: {
                    id: employeeId
                }
            })

        } catch(error) {

            logger.error('deleteEmployee service', error)
            new InternalError()
        }
        
    },

    isTheSameEmailExists: async (values) => {

        try {

            const { email } = values

            const totalResult = await Employee.count({
                where: {
                    email: email
                },
                distinct: true
            })
            return totalResult

        } catch(error) {
            logger.error(error)
            new InternalError()
        }
    },

    isTheSameEmailExistsWithDifferentId: async (employeeId, values) => {

        try {

            const { email } = values

            const totalResult = await Employee.count({
                where: {
                    email: email,
                    id: { [Sequelize.Op.not]: employeeId }
                },
                distinct: true
            })
            return totalResult

        } catch(error) {

            logger.error('isTheSameEmailExistsWithDifferentId', error)
            new InternalError()

        }
    }

}