const { logger } = require('../../../config/logger');
const usersService = require('../../../services/user.service');
const { emitUserFailedValidation } = require('../../../services/eventEmitter.service');
const { dateStrRegExp, ageRequirementCheck, validDateCheck, BadRequestError } = require('../../utils')
const { user_role } = require('../../../config/constants');
const { ROLE_ADMIN, ROLE_EMPLOYEE } = user_role
const Joi = require('joi');
const jwtDecode = require("jwt-decode")

const addUserSchema = Joi.object({
    firstName: Joi.string()
        .alphanum()
        .min(3)
        .max(20)
        .required(),

    lastName: Joi.string()
        .alphanum()
        .min(3)
        .max(20)
        .required(),

    salary: Joi.number(),

    birthday: Joi.string()
        .pattern(new RegExp(dateStrRegExp), 'dd.mm.yyyy')
        .custom( validDateCheck)
        .message('Invalid date')
        .custom( ageRequirementCheck)
        .message('Age required to be 18 - 75 years range'),

    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),

    role: Joi.string()
        .valid(`ROLE_ADMIN`, `ROLE_EMPLOYEE`)
        .required(),
        

}).unknown()

const editUserSchema = Joi.object({
    firstName: Joi.string()
        .alphanum()
        .min(3)
        .max(20)
        .required(),

    lastName: Joi.string()
        .alphanum()
        .min(3)
        .max(20)
        .required(),

    salary: Joi.number(),

    birthday: Joi.string()
        .pattern(new RegExp(dateStrRegExp), 'dd.mm.yyyy')
        .custom( validDateCheck, 'Valid date check')
        .message('Invalid date')
        .custom( ageRequirementCheck, 'Age requirement')
        .message('Age required to be 18 - 75 years range'),

    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()

}).unknown()

const querySchema = Joi.object({

    role: Joi.string(),

    departmentId: Joi.string()

})


const getUsers = async (req, res, next) => {

    try {

        const query = req.query
        const { value, error } = querySchema.validate(query)

        const users = await usersService.getUsers(value)

        res.json(users)

    } catch (error) {
        next(error)
    }
}

const getUserById = async (req, res, next) => {

    try {

        const { token } = req.headers
        const { userid } = req.params

        const user = await usersService.getUserById(userid)
        const { departmentid } = user

        const decoded = jwtDecode(token)
        
        if (decoded.role === ROLE_ADMIN) {
            res.json({
                user: user
            })
        } 
        
        if (decoded.role === ROLE_EMPLOYEE) {
            decoded.departmentid === departmentid 
                ? res.send(user)
                : res.sendStatus(401)
        }

    } catch (error) {
        next(error)
    }
}

const createUser = async (req, res, next) => {

    try {

        const body = req.body
        const { value, error } = addUserSchema.validate(body)

        if (error) {

            logger.info(error)
            emitUserFailedValidation(error.details[0].message)
            throw new BadRequestError(`${error}`)

        } else {

            const result = await usersService.isTheSameEmailExists(value)
            if (result !== 0) {
                // if validation failed
                logger.info(`Create user: "${value.email}" is used`)
                emitUserFailedValidation('Create user: email is used')
                throw new BadRequestError(`Create user: "${value.email}" is used`)
            } else {
                // if validation pass
                const { id } = await usersService.addUser(value)
                const user = await usersService.getUserById(id)
                res.send(user)
            }

        }

    } catch (error) {
        next(error)
    }
}

const editUser = async (req, res, next) => {

    try {

        const body = req.body
        const { id } = req.params
        const { value, error } = editUserSchema.validate(body)

        if (error) {

            logger.info(error.details[0].message)
            emitUserFailedValidation(error.details[0].message)
            throw new BadRequestError(`${error}`)

        } else {

            const result = await usersService.isTheSameEmailExists(value)
            
            if (result !== 0) {
                // if validation failed
                logger.info(`Edit user: "${value.email}" is used`)
                emitUserFailedValidation('Edit user: email is used')
                throw new BadRequestError(`Edit user: "${value.email}" is used`)
            } else {
                // if validation pass
                await usersService.editUser(id, value)
                const user = await usersService.getUserById(id)          
                res.send(user)
            }

        }

    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req, res, next) => {

    try {

        const { id } = req.params
        await usersService.deleteEmployee(id)

    } catch (error) {
        next(error)
    }

}

module.exports = {
    addUserSchema,
    getUsers,
    getUserById,
    createUser,
    editUser,
    deleteUser
}