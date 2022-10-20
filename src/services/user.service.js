const {Sequelize} = require('sequelize');
const {parseOptionalValueToColumnRecord} = require('./utils')
const {userAuthTokenDTO, userDTO, userFullDTO, createdUserDTO} = require('../model/user')
const {logger} = require('../config/logger');
const {BadRequestError, ValidationError, commonErrorToErrorObjDTO} = require('../controller/utils');
const models = require('../model')
const {user_role} = require("../config/constants");
const {User} = models;
const {ROLE_ADMIN, ROLE_EMPLOYEE} = user_role



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
    } catch (error) {

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
    } catch (error) {

      logger.error('getUserById service', error)
      throw error
<<<<<<< Updated upstream

    }
  },

=======

    }
  },

>>>>>>> Stashed changes
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
    } catch (error) {

      logger.error('getUserById service', error)
      throw error

    }
  },

  getUsers: async (value) => {

    const {role, departmentId} = value
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

<<<<<<< Updated upstream
<<<<<<< Updated upstream
    } catch(error) {
=======
    } catch (error) {
>>>>>>> Stashed changes
=======
    } catch (error) {
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream

      if (!userInstance) {
        throw new BadRequestError(`Employee with id - ${id}, nothing found!`)
      } else {
        const resultUserValues = userDTO(userInstance)
        return resultUserValues
      }

<<<<<<< Updated upstream
    } catch(error) {
=======
    } catch (error) {
>>>>>>> Stashed changes

      logger.error('getUserById service', error)
      throw error

    }
  },

  addUser: async (values) => {

    try {

<<<<<<< Updated upstream
      const { firstName, lastName, salary, birthday, email, role, departmentid } = values
=======
      const {firstName, lastName, salary, birthday, email, role, departmentid} = values
>>>>>>> Stashed changes

      const salaryParsed = parseOptionalValueToColumnRecord(salary)
      const birthdayParsed = parseOptionalValueToColumnRecord(birthday)

<<<<<<< Updated upstream
      const result =  await User.create({
=======
      const result = await User.create({
>>>>>>> Stashed changes
        firstName,
        lastName,
        salary: salaryParsed,
        departmentid,
        birthday: birthdayParsed,
        email,
        role: role
      })

      return createdUserDTO(result)

<<<<<<< Updated upstream
    } catch(error) {
=======
    } catch (error) {
>>>>>>> Stashed changes

      logger.error('addUser service', error)
      throw error

=======

      if (!userInstance) {
        throw new BadRequestError(`Employee with id - ${id}, nothing found!`)
      } else {
        const resultUserValues = userDTO(userInstance)
        return resultUserValues
      }

    } catch (error) {

      logger.error('getUserById service', error)
      throw error

    }
  },

  addUser: async (values) => {

    try {

      const {firstName, lastName, salary, birthday, email, role, departmentid} = values

      const salaryParsed = parseOptionalValueToColumnRecord(salary)
      const birthdayParsed = parseOptionalValueToColumnRecord(birthday)

      const result = await User.create({
        firstName,
        lastName,
        salary: salaryParsed,
        departmentid,
        birthday: birthdayParsed,
        email,
        role: role
      })

      return createdUserDTO(result)

    } catch (error) {

      logger.error('addUser service', error)
      throw error

>>>>>>> Stashed changes
    }
  },

  editUser: async (id, values) => {

    try {

<<<<<<< Updated upstream
<<<<<<< Updated upstream
      const { firstName, lastName, salary, birthday, email, departmentid } = values
=======
      const {firstName, lastName, salary, birthday, email, departmentid} = values
>>>>>>> Stashed changes
=======
      const {firstName, lastName, salary, birthday, email, departmentid} = values
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
<<<<<<< Updated upstream
    } catch(error) {
=======
    } catch (error) {
>>>>>>> Stashed changes
=======
    } catch (error) {
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream

<<<<<<< Updated upstream
    } catch(error) {
=======
    } catch (error) {
>>>>>>> Stashed changes

      logger.error('deleteUser service', error)
      throw error
    }
  },

  isTheSameEmailExists: (values) => {

    try {

<<<<<<< Updated upstream
      const { email } = values
=======
      const {email} = values
>>>>>>> Stashed changes

      return User.count({
        where: {
          email
        },
        distinct: true
      })

<<<<<<< Updated upstream
    } catch(error) {
=======
    } catch (error) {
>>>>>>> Stashed changes

      logger.error('isTheSameEmailExists service', error)
      throw error
    }
  },

  isTheSameEmailExistsWithDifferentId: (userId, values) => {

    try {

<<<<<<< Updated upstream
      const { email } = values
=======
      const {email} = values
>>>>>>> Stashed changes

=======

    } catch (error) {

      logger.error('deleteUser service', error)
      throw error
    }
  },

  isTheSameEmailExists: (values) => {

    try {

      const {email} = values

      return User.count({
        where: {
          email
        },
        distinct: true
      })

    } catch (error) {

      logger.error('isTheSameEmailExists service', error)
      throw error
    }
  },

  isTheSameEmailExistsWithDifferentId: (userId, values) => {

    try {

      const {email} = values

>>>>>>> Stashed changes
      return User.count({
        where: {
          email,
          role: ROLE_EMPLOYEE,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
          id: { [Sequelize.Op.not]: userId }
=======
          id: {[Sequelize.Op.not]: userId}
>>>>>>> Stashed changes
=======
          id: {[Sequelize.Op.not]: userId}
>>>>>>> Stashed changes
        },
        distinct: true
      })

<<<<<<< Updated upstream
<<<<<<< Updated upstream
    } catch(error) {
=======
    } catch (error) {
>>>>>>> Stashed changes
=======
    } catch (error) {
>>>>>>> Stashed changes

      logger.error('isTheSameEmailExistsWithDifferentId', error)
      throw error
    }
  }

}