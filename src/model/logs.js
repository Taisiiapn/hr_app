const LogsModelBuilder = (DataTypes, sequelize) => {

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
    }, {
      sequelize: sequelize,
      freezeTableName: true,
      tableName: 'logs',
      createdAt: false,
      updatedAt: false
    }
  )
  return Logs
}

module.exports = {
  builder: LogsModelBuilder
}