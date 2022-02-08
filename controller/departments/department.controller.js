const ejs = require('ejs')
const Joi = require('joi')
const logger = require('../../config/logger')
const departmentsModel = require('../../services/departments.service')
const { emitDepartmentFailedValidation } = require('../../services/eventEmitter.service')

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
    
    renderDepartments: (cb) => {

        try {
            departmentsModel.getAllDepartments((error, departments) => {
                if (error) {
                    return cb(error)
                } else {
                    const mutatedDepartments = departments.map(department => {

                        return {
                            ...department.dataValues,
                            addLink: '/departments/create',
                            updateLink: `/departments/${department.id}/update`,
                            showLink: `/departments/${department.id}`,
                            deleteLink: `/departments/${department.id}`
                        }
                    })

                    ejs.renderFile(__dirname + '/../../views/departments/departmentsList.ejs',
                        {data: mutatedDepartments}, 
                        function (error, html) {
                            if (error) {
                                logger.error('err renderDepartments', error)
                                return cb(error)
                            } else {
                                return cb( null, html)
                            }
                        }
                    )
                }
            })
        } catch(error) {
            logger.error(error)
            return cb(new Error('Internal server Error'))
        }
        
    },

    renderCreateDepartment: (parameters, cb) => {

        try {
            ejs.renderFile(__dirname + '/../../views/departments/createDepartment.ejs',
                    {parameters},
                    function (error, html) {
                        if (error) {
                            cb(error)
                            logger.error(error)
                        } else {
                            cb(null, html)
                        }
                    }
            )
        } catch(error) {
            logger.error(error)
            cb(new Error('Internal server Error'))
        }
    },

    renderEditDepartment: (departmentId, query, cb) => {

        try {
    
            function setUpParameters(id, query, paramsCB) {

                const resultParameters = {}
                const { body, error } = query;
                
                if (error) {
                    
                    const values = JSON.parse(body)
                    resultParameters['values'] = values,
                    resultParameters['error'] = error
                    
                    paramsCB(null, resultParameters)

                    logger.info(error)

                } else {

                    departmentsModel.getDepartmentById(id, (error, rows) => {
                        if (error) {

                            paramsCB(error)
                            logger.info(error)

                        } else {
                            const resultValues = {
                                name: rows[0]['name']
                            }
                            resultParameters['values'] = resultValues
                            paramsCB(null, resultParameters)
                        }
                    })
                }
            }

            setUpParameters(departmentId, query, (setUpError, parameters) => {
                
                if (setUpError) {
                    cb(setUpError)
                } else {

                    ejs.renderFile(__dirname + '/../../views/departments/editDepartment.ejs',
                    {
                        id: departmentId,
                        parameters
                    },
                    function (error, html) {
                        if (error) {
                            cb(error)
                            logger.error('err renderEditDepartment', error);
                        } else {
                            cb(null, html)
                        }
                    }
                    )
                }
            })

        } catch(error) {
            logger.error(error)
            cb(new Error('Internal server Error'))
        }
    },

    addDepartment: (rawValues, cb) => {

        try {

            // validation:

            // - dep name required

            const { value, error } = addDepartmentSchema.validate(rawValues)

            if (error) {

                cb(null, new Error(`${error}`))
                logger.info(error)
                emitDepartmentFailedValidation(error.details[0].message)
            
            } else {
            // - unique dep name (async)

                departmentsModel.isTheSameDepartmentNameExists(value, (isTheSame_error, isExists) => {
                    if (isTheSame_error) {
                        cb(isTheSame_error)
                    } else {
                        if (isExists) {
                            // if validation failed
                            cb(null, new Error(`Department name "${value.name}" is used`))
                            logger.info(`Department name "${value.name}" is used`)
                            emitDepartmentFailedValidation('Add department: name is used')
                        } else {
                            // if validation pass
                            departmentsModel.addDepartment(value, (error) => {
                                if (error) {
                                    cb(error)
                                    logger.error(error)
                                } else {
                                    cb(null)
                                }
                            })
                        }
                    }
                })
            }
        } catch(error) {
            logger.error(error)
            cb(new Error('Internal server Error'))
        }
    },

    editDepartment: (departmentId, rawValues, cb) => {

        try {

            const { value, error } = editDepartmentSchema.validate(rawValues)

            if (error) {

                cb(null, new Error(`${error}`))
                logger.info(error.details[0].message)
                emitDepartmentFailedValidation(error.details[0].message)
            
            } else {

                departmentsModel.isTheSameDepartmentNameExists(value, (isTheSame_error, isExists) => {
                    if (isTheSame_error) {
                        cb(isTheSame_error)
                    } else {
                        if (isExists) {
                            // if validation failed
                            cb(null, new Error(`Department name "${value.name}" is used`))
                            logger.info(`Department name "${value.name}" is used`)
                            emitDepartmentFailedValidation('Edit department: name is used')
                        } else {
                            // if validation pass
                            departmentsModel.editDepartment(departmentId, value, (error) => {
                                if (error) {
                                    cb(error)
                                    logger.info(error)
                                } else {
                                    cb(null)
                                }
                            })
                        }
                    }
                })
            }

        } catch(error) {
            logger.error(error)
            cb(new Error('Internal server Error'))
        }

    },

    deleteDepartment: (departmentId, cb) => {

        try {

            departmentsModel.deleteDepartment(departmentId, (error) => {
                if (error) {
                    cb(error)
                    logger.error(error)
                } else {
                    cb(null)
                }
            })

        } catch(error) {
            logger.error(error)
            cb(new Error('Internal server Error'))
        }
    }

}