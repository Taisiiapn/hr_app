const { DataTypes } = require('sequelize');
const { User } = require('./user');
const sequelize = require('../syncDB')

const departmentDTO = (departmentInstance) => {
  return {
    id: departmentInstance.get('id'),
    name: departmentInstance.get('name')
  }
}

const createdDepartmentDTO = (departmentInstance) => {
  return {
    id: departmentInstance.get('id')
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


module.exports = (DataTypes, sequelize) => {
  
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
      field: 'createdat'
    },

    updatedAt: {
      type: DataTypes.DATE,
      field: 'updatedat'
    }
  },
  {
    sequelize: sequelize,
    freezeTableName: true,
    tableName: 'department'
  })

  Department.hasMany(User, {
    foreignKey: 'departmentid', 
    sourceKey: 'id', 
    as: 'users'
  })

  User.belongsTo(Department, {
    foreignKey: 'id',
    as: 'department'
  })

}

module.exports = {
  departmentDTO,
  createdDepartmentDTO
}