const ejs = require('ejs')
const Joi = require('joi')
const { logger, errorNames } = require('../../config/logger')
const departmentsService = require('../../services/departments.service')
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
    
    renderDepartments: async () => {

        const departments = await departmentsService.getAllDepartmentsWithViewValues()

        const html = ejs.renderFile(__dirname + '/../../views/departments/departmentsList.ejs',
            {data: departments}
        )
        return html
    },

    renderCreateDepartment: async(parameters) => {

        const html = ejs.renderFile(__dirname + '/../../views/departments/createDepartment.ejs',
            {parameters},       
        )
        return html
    },

    renderEditDepartment: async (departmentId, query) => {
    
        const setUpParameters = async (id, query) => {

            const resultParameters = {}
            const { body, error } = query
            
            if (error) {
                
                const values = JSON.parse(body)
                resultParameters['values'] = values
                resultParameters['error'] = error
                
                logger.info(error)
                return resultParameters

            } else {

                const departmentValues = await departmentsService.getDepartmentById(id)
                resultParameters['values'] = departmentValues
                return resultParameters
            }
        }

        const parameters = await setUpParameters(departmentId, query)
        const html = ejs.renderFile(__dirname + '/../../views/departments/editDepartment.ejs',
                {
                    id: departmentId,
                    parameters
                })
        return html
    },

    addDepartment: async (rawValues) => {

        // validation:
        // - dep name required

        const { value, error } = addDepartmentSchema.validate(rawValues)

        if (error) {

            logger.info(error)
            emitDepartmentFailedValidation(error.details[0].message)
            return new Error(`${error}`)
        
        } else {
            // - unique dep name (async)

            const resultTotal = await departmentsService.isTheSameDepartmentNameExists(value)
            if (resultTotal !== 0) {
                // if validation failed
                logger.info(`Department name "${value.name}" is used`)
                emitDepartmentFailedValidation('Add department: name is used')
                return new Error(`Department name "${value.name}" is used`)
            } else {
                // if validation pass
                await departmentsService.addDepartment(value)
            }
        }
    },

    editDepartment: async (departmentId, rawValues) => {

        const { value, error } = editDepartmentSchema.validate(rawValues)

        if (error) {

            logger.info(error.details[0].message)
            emitDepartmentFailedValidation(error.details[0].message)
            return new Error(`${error}`)
        
        } else {

            const resultTotal = await departmentsService.isTheSameDepartmentNameExists(value)

            if (resultTotal !== 0) {
                // if validation failed
                logger.info(`Department name "${value.name}" is used`)
                emitDepartmentFailedValidation('Edit department: name is used')
                return new Error(`Department name "${value.name}" is used`)
            } else {
                // if validation pass
                await departmentsService.editDepartment(departmentId, value)
            }
        }
    },

    deleteDepartment: async (departmentId) => {

        await departmentsService.deleteDepartment(departmentId)
    
    }

}