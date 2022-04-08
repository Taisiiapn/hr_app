const { Client } = require('pg')
const { Sequelize } = require('sequelize');
const { parseOptionalStringValueToColumnRecord, parseOptionalNumberValueToColumnRecord } = require('./utils')
const environment = require('../config/environment')
const { User, userAuthTokenDTO, userWithViewValuesDTO, userDTO } = require('../model/user.model')
const { logger } = require('../config/logger');
const { InternalError, BadRequestError } = require('../controller/utils');
const {user_role} = require("../config/constants");

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
                throw new BadRequestError(`${email} not found!`)
            } else {
                const resultUserValues = userAuthTokenDTO(userInstance)
                return resultUserValues
            }
        }
        catch(error) {
            if (error.status) {
                throw error
            } else {
                logger.error('getUserByEmailAuth service', error)
                throw new InternalError()
            }


        }
    },

    getUsersWithViewValues: async (depId) => {

        try {

            const allUsers = await User.findAll({
                where: {
                    departmentid: depId,
                    role: user_role.ROLE_EMPLOYEE
                }
            })
           
            return allUsers
                .map(
                    userInstance =>
                        userWithViewValuesDTO(depId, userInstance)
                )

        } catch(error) {

            logger.error('getUserWithViewValues service', error)
            throw new InternalError()
        }

    },

    getUserById: async (id) => {

        try {

            const userInstance = await User.find({
                where: {
                    id,
                    role: user_role.ROLE_EMPLOYEE,
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
            throw new InternalError()
        }

    },

    addUser: async (values) => {

        try {

            const { name, salary, departmentid, birthday, email } = values

            const salaryParsed = parseOptionalNumberValueToColumnRecord(salary)
            const birthdayParsed = parseOptionalStringValueToColumnRecord(birthday)

            await User.create({
                name,
                salary: salaryParsed,
                departmentid,
                birthday: birthdayParsed,
                email,
                role: user_role.ROLE_EMPLOYEE
            })
        } catch(error) {
            logger.error('addUser service', error)
            throw new InternalError()
        }
       
    },

    editUser: async (id, values) => {

        try {

            const { name, salary, birthday, email } = values
        
            const salaryParsed = parseOptionalNumberValueToColumnRecord(salary)
            const birthdayParsed = parseOptionalStringValueToColumnRecord(birthday)
            
            await User.update({
                name,
                salary: salaryParsed,
                birthday: birthdayParsed,
                email
            }, {
                where: {
                    role: user_role.ROLE_EMPLOYEE,
                    id
                }
            })
            
        } catch(error) {

            logger.error('editUser service', error)
            throw new InternalError()

        }
        
    },

    deleteEmployee: async (userId) => {

        try {

            await User.destroy({
                where: {
                    role: user_role.ROLE_EMPLOYEE,
                    id: userId
                }
            })

        } catch(error) {

            logger.error('deleteUser service', error)
            throw new InternalError()
        }
        
    },

    isTheSameEmailExists: (values) => {

        try {

            const { email } = values

            return User.count({
                where: {
                    email,
                    role: user_role.ROLE_EMPLOYEE
                },
                distinct: true
            })

        } catch(error) {
            logger.error('isTheSameEmailExists service', error)
            throw new InternalError()
        }
    },

    isTheSameEmailExistsWithDifferentId: (userId, values) => {

        try {

            const { email } = values

            return User.count({
                where: {
                    email,
                    role: user_role.ROLE_EMPLOYEE,
                    id: { [Sequelize.Op.not]: userId }
                },
                distinct: true
            })

        } catch(error) {

            logger.error('isTheSameEmailExistsWithDifferentId', error)
            throw new InternalError()

        }
    }

}