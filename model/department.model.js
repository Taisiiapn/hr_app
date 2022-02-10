const { Sequelize, DataTypes } = require('sequelize');
const { Employee } = require('./employee.model');
const postgres = require('../config/sequelize')
const sequelize = new Sequelize(postgres.options)

const departmentDTO = (departmentInstance) => {
  return {
    id: departmentInstance.get('id'),
    name: departmentInstance.get('name')
  }
}

const departmentFullDTO = (departmentInstance) => {
  return {
    id: departmentInstance.get('id'),
    name: departmentInstance.get('name'),
    createdAt: departmentInstance.get('createdAt'),
    updatedAt: departmentInstance.get('updatedAt')
  }
}

const departmentWithViewValuesDTO = (departmentInstance) => {
   
  return {
    ...departmentDTO(departmentInstance),
    addLink: '/departments/create',
    updateLink: `/departments/${departmentInstance.get('id')}/update`,
    showLink: `/departments/${departmentInstance.get('id')}`,
    deleteLink: `/departments/${departmentInstance.get('id')}`
  }

}

const Department = sequelize.define('Department', {

  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },

  name: {
    type: DataTypes.STRING
  },

  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at'
  },

  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at'
  }
},
{
  sequelize: sequelize,
  freezeTableName: true,
  tableName: 'department'
});

Department.hasMany(Employee, {foreignKey: 'departmentid', sourceKey: 'id'})
Employee.belongsTo(Department, {foreignKey: 'id'})

console.log('Connected to Department bd')


module.exports = {
  Department, 
  sequelize,
  departmentDTO,
  departmentWithViewValuesDTO
}