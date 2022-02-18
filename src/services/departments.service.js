const { Client } = require('pg')
const { logger } = require('../config/logger')
const environment = require('../config/environment')
const { Department, sequelize, departmentDTO, departmentWithViewValuesDTO } = require('../model/department.model')
const { Employee } = require('../model/employee.model')
const { InternalError, BadRequestError } = require('../controller/utils')

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

    getAllDepartmentsWithViewValues: async () => {

        try{
            let allDepartments = await Department.findAll()

            if (allDepartments.length === 0) {
                new BadRequestError(`Departments not found!`)
            } else {
                return allDepartments
                    .map(departmentInstance => 
                            departmentWithViewValuesDTO(departmentInstance)
                    )
            }
        } catch(error) {
            logger.error(error)
            new InternalError()
        }
    },

    getDepartmentById: async (id) => {

        try {

            const departmentInstance = await Department.findByPk(id)
            if (departmentInstance) {
                const resultDepartmentValues = departmentDTO(departmentInstance)
                return resultDepartmentValues
            } else {
                return new BadRequestError(`Department with id - ${id}, nothing found!`)
            }

        } catch (error) {

            logger.error(error)
            new InternalError()

        }
    },

    // getDepartmentByIdWithEmployees: (id) => new Promise((resolve, reject) => {

    //     Department.findByPk({
    //         where: {
    //             id: id
    //         },
    //         include: [
    //             {
    //                 model: Employee, as: id,
    //                 where: {
    //                     departmentid: id
    //                 },
    //                 required: false
    //             }
    //         ]
    //     })
    //         .then(departments => {
    //             resolve(departments)
    //         })
    //         .catch(error => {
    //             logger.error(error)
    //             reject(error)
    //         })

    // }),

    addDepartment: async (values) => {

        try {

            const { name } = values

            await Department.create({
                name: name
            })
        } catch(error) {

            logger.error('addDepartment service', error)
            new InternalError()
        }
  
    },

    editDepartment: async (departmentId, values) => {

        try {
            const { name } = values

            await Department.update({
                name: name
            }, {
                where: {
                    id: departmentId
                }
            })
        } catch(error) {

            logger.error(error)
            new InternalError()
        }
    },

    deleteDepartment: async (departmentId) => {
    
        let t;
        
        try {

            const transaction = await sequelize.transaction()
            t = transaction

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

            t.commit()
                
        } catch(error) {
            t.rollback()
            logger.error('deleteDepartment service', error)
            new InternalError()
        }
    },

    isTheSameDepartmentNameExists: async (values) => {

        try {
         
            const { name } = values

            const totalResult = await Department.count({
                where: {
                    name: name
                },
                distinct: true
            })
            return totalResult
        } catch(error) {
            logger.error(error)
            return new InternalError()
        }
    }

}