const { DataTypes } = require('sequelize')
const { sequelize } = require('./department.model')

const Logs = sequelize.define('Department', 
  {

    level: {
      type: DataTypes.STRING,
      allowNull: false
    },
  
    message: {
      type: DataTypes.STRING
    },
  
    timestamp: {
      type: DataTypes.DATE
    },
  
    meta: {
      type: DataTypes.JSON
    }
  },

  {
    sequelize: sequelize,
    freezeTableName: true,
    tableName: 'department',
    createdAt: false,
    updatedAt: false
  }
);


module.exports = {
  Logs
}