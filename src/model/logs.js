const { DataTypes } = require('sequelize')
const sequelize = require('../syncDB')


module.exports = (DataTypes, sequelize) => {

  const Logs = sequelize.define('Logs', 
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
      tableName: 'logs',
      createdAt: false,
      updatedAt: false
    }
  )

}