const { Client } = require('pg')
const { Sequelize } = require('sequelize');
const { parseOptionalValueToColumnRecord } = require('./utils')
const environment = require('../config/environment')
const { User, userAuthTokenDTO, userDTO, userFullDTO, createdUserDTO } = require('../model/user.model')
const { logger } = require('../config/logger');
const { InternalError, BadRequestError, ValidationError, commonErrorToErrorObjDTO } = require('../controller/utils');
const {user_role} = require("../config/constants");
const { ROLE_ADMIN, ROLE_EMPLOYEE } = user_role

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

    getUserByEmailAuth: async (email) => {
        try {
            const userInstance = await User.findOne({
                where: {
                    email
                }
            })

            if (!userInstance) {
                const errorObjJSON = JSON.stringify(
                    commonErrorToErrorObjDTO(`${email} not found!`)
                )
                throw new ValidationError(errorObjJSON)
            } else {
                const resultUserValues = userAuthTokenDTO(userInstance)
                return resultUserValues
            }
        }
        catch(error) {
            
            logger.error('getUserByEmailAuth service', error)
            throw error
        
        }
    },

    getAuthUserById: async (id) => {
        try {
            const userInstance = await User.findOne({
                where: {
                    id
                }
            })

            if (!userInstance) {
                throw new BadRequestError('User not found!')
            } else {
                const resultUserValues = userAuthTokenDTO(userInstance)
                return resultUserValues
            }
        }
        catch(error) {

            logger.error('getUserById service', error)
            throw error

        }
    },

    getUserById: async (id) => {
        try {
            const userInstance = await User.findOne({
                where: {
                    id
                }
            })

            if (!userInstance) {
                throw new BadRequestError('User not found!')
            } else {
                const resultUserValues = userFullDTO(userInstance)
                return resultUserValues
            }
        }
        catch(error) {

            logger.error('getUserById service', error)
            throw error

        }
    },

    getUsers: async (value) => {

        const { role, departmentId } = value
        let users = [];

        try {

            if (role === ROLE_ADMIN) {
                users = await User.findAll({
                    where: {
                        role: ROLE_ADMIN
                    }
                })
            } else if (role === ROLE_EMPLOYEE && departmentId) {
                users = await User.findAll({
                    where: {
                        role: ROLE_EMPLOYEE,
                        departmentid: departmentId
                    }
                })
            } else if (role === ROLE_EMPLOYEE && !departmentId) {
                users = await User.findAll({
                    where: {
                        role: ROLE_EMPLOYEE
                    }
                })
            } else if (!role && !departmentId) {
                users = await User.findAll()
            }

            return users.map(
                userInstance =>
                    userDTO(userInstance)
            )    

        } catch(error) {

            logger.error('getUserWithViewValues service', error)
            throw error

        }
    },

    getUsersByDepartmentId: async (id) => {

        try {

            const userInstance = await User.find({
                where: {
                    id
                }
            })

            if (!userInstance) {
                throw new BadRequestError(`Employee with id - ${id}, nothing found!`)
            } else {
                const resultUserValues = userDTO(userInstance)
                return resultUserValues
            }

        } catch(error) {

            logger.error('getUserById service', error)
            throw error

        }
    },

    addUser: async (values) => {

        try {

            const { firstName, lastName, salary, birthday, email, role, departmentid } = values

            const salaryParsed = parseOptionalValueToColumnRecord(salary)
            const birthdayParsed = parseOptionalValueToColumnRecord(birthday)

           const result =  await User.create({
                firstName,
                lastName,
                salary: salaryParsed,
                departmentid,
                birthday: birthdayParsed,
                email,
                role: role
            })

            return createdUserDTO(result)

        } catch(error) {

            logger.error('addUser service', error)
            throw error

        }
    },

    editUser: async (id, values) => {

        try {

            const { firstName, lastName, salary, birthday, email, departmentid } = values
             
            const salaryParsed = parseOptionalValueToColumnRecord(salary)
            const birthdayParsed = parseOptionalValueToColumnRecord(birthday)
            
            const resultObj = Object.assign(values, {
                salary: salaryParsed ? salaryParsed : undefined,
                birthday: birthday ? birthday : undefined
            })

            await User.update({
                firstName,
                lastName,
                salary: salaryParsed,
                birthday: birthdayParsed,
                email,
                departmentid
            }, {
                where: {
                    id
                }
            })
            
        } catch(error) {

            logger.error('editUser service', error)
            throw error
        }
    },

    deleteEmployee: async (userId) => {

        try {

            await User.destroy({
                where: {
                    role: ROLE_EMPLOYEE,
                    id: userId
                }
            })

        } catch(error) {

            logger.error('deleteUser service', error)
            throw error
        }
    },

    isTheSameEmailExists: (values) => {

        try {

            const { email } = values

            return User.count({
                where: {
                    email
                },
                distinct: true
            })

        } catch(error) {

            logger.error('isTheSameEmailExists service', error)
            throw error
        }
    },

    isTheSameEmailExistsWithDifferentId: (userId, values) => {

        try {

            const { email } = values

            return User.count({
                where: {
                    email,
                    role: ROLE_EMPLOYEE,
                    id: { [Sequelize.Op.not]: userId }
                },
                distinct: true
            })

        } catch(error) {

            logger.error('isTheSameEmailExistsWithDifferentId', error)
            throw error
        }
    }

}