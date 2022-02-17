const { Client } = require('pg')
const logger = require('../config/logger')
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

    getAllDepartmentsWithViewValues: () => new Promise((resolve, reject) => {

        Department.findAll()
            .then(allDepartments => {

                if (allDepartments.length === 0) {
                    reject(new BadRequestError(`Departments not found!`))
                } else {
                    resolve(allDepartments
                        .map(
                            departmentInstance => 
                                departmentWithViewValuesDTO(departmentInstance)
                        )
                    )
                }
                
            })
            .catch(error => {
                logger.error(error)
                reject(new InternalError())
            })
        
    }),

    getDepartmentById: (id) => new Promise((resolve, reject) => {

        Department.findByPk(id)
            .then(departmentInstance => {

                if (departmentInstance) {
                    const resultDepartmentValues = departmentDTO(departmentInstance)
                    resolve(resultDepartmentValues)
                } else {
                    reject(new BadRequestError(`Department with id - ${id}, nothing found!`))
                }

            })
            .catch(error => {
                logger.error(error)
                reject(new InternalError())
            })

    }),

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
    
    addDepartment: (values) => new Promise((resolve, reject) => {

        const { name } = values

        Department.create({
            name: name
        })
            .then(() => resolve())
            .catch(error => {
                logger.error('addDepartment service', error)
                reject(new InternalError())
            })
  
    }),

    editDepartment: (departmentId, values) => new Promise((resolve, reject) => {
        // todo get department instance by id and do bulk update
        const { name } = values

        Department.update({
            name: name
        }, {
            where: {
                id: departmentId
            }
        })
            .then(() => resolve())
            .catch(error => {
                logger.error(error)
                reject(new InternalError())
            })
        
    }),

    deleteDepartment:  (departmentId) => new Promise((resolve, reject) => {
    
        let t;

        sequelize.transaction()
        .then(transaction => {
            t = transaction

            Employee.destroy({
                where: {
                    departmentid: departmentId
                }
            }, {transaction: t})

            .then(() => {
                Department.destroy({
                    where: {
                        id: departmentId
                    }
                }, {transaction: t})

                .then(() => {
                    t.commit()
                    resolve()
                })
            })
        })
        .catch(error => {
            t.rollback()
            logger.error('deleteDepartment service', error)
            reject(new InternalError())
        })
    }),

    isTheSameDepartmentNameExists: (values) => new Promise((resolve, reject) => {

        const { name } = values

        Department.count({
            where: {
                name: name
            },
            distinct: true
        })
        .then(totalResult => resolve(totalResult))
        .catch(error => {
            logger.error(error)
            reject(new InternalError())
        })
    })

}