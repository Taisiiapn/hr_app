const { Sequelize, DataTypes } = require('sequelize');
const postgres = require('../config/sequelize');
const sequelize = new Sequelize(postgres.options);

const employeeDTO = (employeeInstance) => {
  return {
    name: employeeInstance.get('name'),
    salary: employeeInstance.get('salary'),
    birthday: employeeInstance.get('birthday'),
    email: employeeInstance.get('email'),
    id: employeeInstance.get('id'),
  }
}

const employeeFullDTO = (employeeInstance) => {
  return {
    name: employeeInstance.get('name'),
    salary: employeeInstance.get('salary'),
    birthday: employeeInstance.get('birthday'),
    email: employeeInstance.get('email'),
    id: employeeInstance.get('id'),
    createdAt: employeeInstance.get('createdAt'),
    updatedAt: employeeInstance.get('updatedAt')
  }
}

const employeeWithViewValuesDTO = (departmentId, employeeInstance) => {
  return {
    ...employeeDTO(employeeInstance),
    updateLink: `/departments/${departmentId}/employees/${employeeInstance.get('id')}/update`,
    deleteLink: `/departments/${departmentId}/employees/${employeeInstance.get('id')}/delete`
  }
}

const Employee = sequelize.define('Employee', {

  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },

  name: {
    type: DataTypes.STRING
  },

  salary: {
    type: DataTypes.INTEGER
  },

  departmentid: {
    type: DataTypes.UUID,
    allowNull: false
  },

  birthday: {
    type: DataTypes.STRING
  },

  email: {
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
  tableName: 'employee'
});

console.log('Connected to Employee bd')

module.exports = {
  Employee,
  employeeDTO,
  employeeWithViewValuesDTO
}