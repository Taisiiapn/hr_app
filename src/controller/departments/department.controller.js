const ejs = require('ejs')
const Joi = require('joi')
const logger = require('../../config/logger')
const departmentsService = require('../../services/departments.service')
const { emitDepartmentFailedValidation } = require('../../services/eventEmitter.service')
const { InternalError } = require('../utils')

const addDepartmentSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(16)
        .required()
})

const editDepartmentSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(16)
        .required()
})


module.exports = {
    
    renderDepartments: () => new Promise((resolve, reject) => {

        departmentsService.getAllDepartmentsWithViewValues()
            .then(departments => {
                ejs.renderFile(__dirname + '/../../views/departments/departmentsList.ejs',
                    {data: departments}
                )
                .then(html => resolve(html))
                .catch(error => reject(error))
            })
            .catch(error => {
                logger.error('renderDepartments controller', error)
                reject(error)
            })
    }),

    renderCreateDepartment: (parameters) => new Promise((resolve, reject) => {

        ejs.renderFile(__dirname + '/../../views/departments/createDepartment.ejs',
            {parameters},
                
        )
        .then(html => resolve(html))
        .catch(error => {
            logger.error('renderCreateDepartment controller', error)
            reject(InternalError())
        })
    }),

    renderEditDepartment: (departmentId, query) => new Promise((render_resolve, render_reject) => {
    
        const setUpParameters = (id, query) => new Promise((params_resolve, params_reject) => {

            const resultParameters = {}
            const { body, error } = query
            
            if (error) {
                
                const values = JSON.parse(body)
                resultParameters['values'] = values
                resultParameters['error'] = error
                
                logger.info(error)
                params_resolve(resultParameters)

            } else {

                departmentsService.getDepartmentById(id)
                    .then(departmentValues => {
                        resultParameters['values'] = departmentValues
                        params_resolve(resultParameters)
                    })
                    .catch(error => {
                        logger.info(error)
                        params_reject(resultParameters)
                    })
            }
        })

        setUpParameters(departmentId, query)
            .then(parameters => {
                ejs.renderFile(__dirname + '/../../views/departments/editDepartment.ejs',
                {
                    id: departmentId,
                    parameters
                })
                .then(html => render_resolve(html))
            })
            .catch(error => {
                logger.error('renderEditDepartment', error)
                render_reject(error)
            })
    }),

    addDepartment: (rawValues) => new Promise((resolve, reject) => {

        // validation:
        // - dep name required

        const { value, error } = addDepartmentSchema.validate(rawValues)

        if (error) {

            logger.info(error)
            emitDepartmentFailedValidation(error.details[0].message)
            resolve(new Error(`${error}`))
        
        } else {
            // - unique dep name (async)

            departmentsService.isTheSameDepartmentNameExists(value)
                .then(resultTotal => {
                    if (resultTotal !== 0) {
                        // if validation failed
                        logger.info(`Department name "${value.name}" is used`)
                        emitDepartmentFailedValidation('Add department: name is used')
                        resolve(new Error(`Department name "${value.name}" is used`))
                    } else {
                        // if validation pass
                        departmentsService.addDepartment(value)
                            .then(() => resolve())
                            .catch(error => {
                                logger.error(error)
                                reject(error)
                            })
                    }
                })
                .catch(error => {
                    logger.error('addDepartment controller', error)
                    reject(error)
                })
        }
    }),

    editDepartment: (departmentId, rawValues) => new Promise((resolve, reject) => {

            const { value, error } = editDepartmentSchema.validate(rawValues)

            if (error) {

                logger.info(error.details[0].message)
                emitDepartmentFailedValidation(error.details[0].message)
                resolve(new Error(`${error}`))
            
            } else {

                departmentsService.isTheSameDepartmentNameExists(value)
                    .then(resultTotal => {
                        if (resultTotal !== 0) {
                            // if validation failed
                            logger.info(`Department name "${value.name}" is used`)
                            emitDepartmentFailedValidation('Edit department: name is used')
                            resolve(new Error(`Department name "${value.name}" is used`))
                        } else {
                            // if validation pass
                            departmentsService.editDepartment(departmentId, value)
                                .then(() => resolve())
                                .catch(error => {
                                    logger.info(error)
                                    reject(error)
                                })
                        }
                    })
                    .catch(error => {
                        logger.error('editDepartment controller', error)
                        reject(error)
                    })
            }
    }),

    deleteDepartment: (departmentId) => new Promise((resolve, reject) => {

        departmentsService.deleteDepartment(departmentId)
            .then(resolve())
            .catch(error => {
                logger.error('deleteDepartment controller', error)
                reject(error)
            })
    })

}