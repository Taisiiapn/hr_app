const { Client } = require('pg')
const logger = require('../config/logger')
const environment = require('../config/environment')
const { Department, sequelize, departmentDTO, departmentWithViewValuesDTO } = require('../model/department.model')
const { Employee } = require('../model/employee.model')

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
                    reject(new Error(`Departments not found!`))
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
                reject(error)
            })
        
    }),

    getDepartmentById: (id) => new Promise((resolve, reject) => {

        Department.findByPk(id)
            .then(departmentInstance => {

                if (departmentInstance) {
                    const resultDepartmentValues = departmentDTO(departmentInstance)
                    resolve(resultDepartmentValues)
                } else {
                    reject(new Error(`Department with id - ${id}, nothing found!`))
                }

            })
            .catch(error => {
                logger.error(error)
                reject(error)
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
                reject(error)
            })
        
    }),

    addDepartment: (values) => new Promise((resolve, reject) => {

        const { name } = values

        Department.create({
            name: name
        })
            .then(() => resolve())
            .catch(error => {
                logger.error('addDepartment service', error)
                reject(error)
            })
  
    }),

    deleteDepartment:  (departmentId) => new Promise(async(resolve, reject) => {

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

            resolve(departments)

            await t.commit()

        } catch (error) {
            await t.rollback()
            logger.error('deleteDepartment service', error)
            reject(error)
        }

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
            reject(error)
        })
    })

}