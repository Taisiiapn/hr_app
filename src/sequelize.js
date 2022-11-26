const postgres = require('./config/sequelize')
const {Sequelize} = require('sequelize')
const { logger } = require('./config/logger')


const sequelize = new Sequelize(postgres.options);

const checkDBConnection = async () => {
  try {
    await sequelize.authenticate()
    console.log('The database connection was successfully established')
  } catch (e) {
    console.log('Unable to connect to database: ', e)
    logger.error('Unable to connect to database: ', e)
  }
}

module.exports = {
  sequelize,
  checkDBConnection
}