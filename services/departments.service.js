const { Client } = require('pg')
const logger = require('../config/logger')
const environment = require('../config/environment')
const { Department, sequelize, departmentDTO, departmentWithViewValuesDTO } = require('../model/department.model')
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

    getAllDepartmentsWithViewValues: (cb) => {

        Department.findAll()
        .then(allDepartments => {

            if (allDepartments.length === 0) {
                cb(new Error(`Departments not found!`))
            } else {
                cb(null, allDepartments.map(departmentInstance => departmentWithViewValuesDTO(departmentInstance)))
            }
            
        })
        .catch(error => {
            cb(new Error('internal server error'))
            logger.error(error)
        })
        
    },

    getDepartmentById: (id, cb) => {

        Department.findByPk(id)
        .then(departmentInstance => {

            if (departmentInstance) {
                const resultDepartmentValues = departmentDTO(departmentInstance)
                cb(null, resultDepartmentValues)
            } else {
                cb(new Error(`Department with id - ${id}, nothing found!`))
            }

        })
        .catch(error => {
            cb(new Error('internal server error'))
            logger.error(error)
        })

    },

    getDepartmentByIdWithEmployees: (id, cb) => {

        Department.findByPk({
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
        // todo get department instance by id and do bulk update
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

    deleteDepartment: async (departmentId, cb) => {

        let t;

        try { 
            t = await sequelize.transaction()
            
            await Employee.destroy({
                where: {
                    departmentid: departmentId
                }
            }, {transaction: t})

            await Department.destroy({
                where: {
                    id: departmentId
                }
            }, {transaction: t})

            cb(null, departments)

            await t.commit()

        } catch (error) {
            await t.rollback()
            logger.error('deleteDepartment service', error)
            cb(new Error('internal server error'))
        }

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