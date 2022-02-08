const { Client } = require('pg')
const logger = require('../config/logger')
const environment = require('../config/environment')
const Department = require('../model/department.model')
const Employee = require('../model/employee.model')

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

    getAllDepartments: (cb) => {

        Department.findAll()
        .then(allDepartments => {

            if (allDepartments.length === 0) {
                cb(new Error(`Departments not found!`))
            } else {
                cb(null, allDepartments)
            }
            
        })
        .catch(error => {
            cb(new Error('internal server error'))
            logger.error(error)
        })
        
    },

    getDepartmentById: (id, cb) => {

        Department.findAll({
            where: {
                id: id
            }
        })
        .then(departments => {

            if (departments.length === 0) {
                cb(new Error(`Department with id - ${id}, nothing found!`))
            } else {
                cb(null, departments)
            }

        })
        .catch(error => {
            cb(new Error('internal server error'))
            logger.error(error)
        })

    },

    getDepartmentByIdWithEmployees: (id, cb) => {

        Department.findAll({
            where: {
                id: id
            },
            include: [
                {
                    model: Employee, as: id,
                    where: {
                        departmentid: id
                    },
                    required: false
                }
            ]
        })
        .then(departments => {
            cb(null, departments)
        })
        .catch(error => {
            cb(error)
            logger.error(error)
        })

    },

    editDepartment: (departmentId, values, cb) => {

        const { name } = values

        Department.update({
            name: name
        }, {
            where: {
                id: departmentId
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

    addDepartment: (values, cb) => {

        const { name } = values

        Department.create({
            name: name
        })
        .then(() => {
            cb(null)
        })
        .catch(error => {
            cb(new Error('internal server error'))
            logger.error(error)
        })
  
    },

    deleteDepartment: (departmentId, cb) => {

        Employee.destroy({
            where: {
                departmentid: departmentId
            }
        })
        .then(() => {

            Department.destroy({
                where: {
                    id: departmentId
                }
            })
        })
        .then(departments => {
                cb(null, departments)
            })
        .catch(error => {

            cb(new Error('internal server error'))
            logger.error(error)
        })

    },

    isTheSameDepartmentNameExists: (values, cb) => {

        const { name } = values

        Department.findAll({
            where: {
                name: name
            }
        })
        .then(allDepartments => {

            if(allDepartments.length !== 0) {
                cb(null, true)
            } else {
                cb(null, false)
            }
        })
        .catch(error => {
            cb(new Error('internal server error'))
            logger.error(error)
        })

    }

}