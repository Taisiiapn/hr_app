const { Sequelize, DataTypes } = require('sequelize');
const postgres = require('../config/sequelize');
const {user_role} = require("../config/constants");
const { ROLE_ADMIN, ROLE_MODERATOR, ROLE_EMPLOYEE } = user_role
const sequelize = new Sequelize(postgres.options);


const userAuthTokenDTO = (userInstance) => {
  return {
    id: userInstance.get('id'),
    password: userInstance.get('password'),
    role: userInstance.get('role'),
    departmentid: userInstance.get('departmentid'),
  }
}

const userDTO = (userInstance) => {
  return {
    name: userInstance.get('name'),
    salary: userInstance.get('salary'),
    birthday: userInstance.get('birthday'),
    email: userInstance.get('email'),
    id: userInstance.get('id'),
    password: userInstance.get('password')
    //role: ''
  }
}

const userFullDTO = (userInstance) => {
  return {
    name: userInstance.get('name'),
    salary: userInstance.get('salary'),
    birthday: userInstance.get('birthday'),
    email: userInstance.get('email'),
    id: userInstance.get('id'),
    createdAt: userInstance.get('createdAt'),
    updatedAt: userInstance.get('updatedAt')
  }
}

const userWithViewValuesDTO = (departmentId, userInstance) => {
  return {
    ...userDTO(userInstance),
    updateLink: `/departments/${departmentId}/employees/${userInstance.get('id')}/update`,
    deleteLink: `/departments/${departmentId}/employees/${userInstance.get('id')}/delete`
  }
}

const User = sequelize.define('User', {

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
    allowNull: true
  },

  birthday: {
    type: DataTypes.STRING
  },

  email: {
    type: DataTypes.STRING
  },

  password: {
    type: DataTypes.STRING
  },

  role: {
    type: DataTypes.ENUM(ROLE_ADMIN, ROLE_MODERATOR, ROLE_EMPLOYEE)
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
    tableName: 'user'
  }
);

console.log('Connected to User bd')

module.exports = {
  User,
  userAuthTokenDTO,
  userDTO,
  userWithViewValuesDTO
}