const {logger} = require('../config/logger')
const {departmentDTO, createdDepartmentDTO} = require('../model/department')
const {BadRequestError} = require('../controller/utils')
const {user_role} = require('../config/constants')
const {sequelize} = require('../sequelize')
const models = require('../model');
const {User, Department} = models;




module.exports = {

  getAllDepartments: async () => {

    try {
      let allDepartments = await Department.findAll()

      if (allDepartments.length === 0) {
        new BadRequestError(`Departments not found!`)
      } else {
        return allDepartments
          .map(departmentInstance =>
            departmentDTO(departmentInstance)
          )
      }
    } catch (error) {

      logger.error(error)
      throw error
    }
  },

  getDepartmentById: async (id) => {

    try {

      const departmentInstance = await Department.findByPk(id)
      if (departmentInstance) {
        const resultDepartmentValues = departmentDTO(departmentInstance)
        return resultDepartmentValues
      } else {
        throw new BadRequestError(`Department with id - ${id}, nothing found!`)
      }

    } catch (error) {

      logger.error(error)
      throw error
    }
  },

  getDepartmentByIdWithEmployees: async (id) => {

    try {

      const department = await Department.findByPk(id, {
        include: {
          model: User,
          as: 'users',
          where: {
            role: user_role.ROLE_EMPLOYEE
          }
        }
      })

      return department

    } catch (error) {

      logger.error(error)
      throw error
    }
  },

  getDepartmentByIdWithUsers: async (id) => {

    try {

      const department = await Department.findByPk(id, {
        include: {
          model: User,
          as: 'users'
        }
      })

      return department

    } catch (error) {

      logger.error(error)
      throw error
    }
  },

  addDepartment: async (values) => {

    try {

      const {name} = values

      const result = await Department.create({
        name: name
      })

      return createdDepartmentDTO(result)

    } catch (error) {

      logger.error('addDepartment service', error)
      throw error
    }
  },

  editDepartment: async (departmentId, values) => {

    try {
      const {name} = values

      await Department.update({
        name: name
      }, {
        where: {
          id: departmentId
        }
      })

    } catch (error) {

      logger.error(error)
      throw error

    }
  },

  deleteDepartment: async (departmentId) => {

    let t;

    try {

      t = await sequelize.transaction()

      await User.destroy({
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

    } catch (error) {

      t.rollback()
      logger.error('deleteDepartment service', error)
      throw error
    }
  },

  isTheSameDepartmentNameExists: (values) => {

    try {

      const {name} = values

      return Department.count({
        where: {
          name: name
        },
        distinct: true
      })

    } catch (error) {

      logger.error(error)
      throw error

    }
  }

}