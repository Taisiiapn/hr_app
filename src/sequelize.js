const postgres = require('./config/sequelize')
const {Sequelize} = require('sequelize')
const { logger } = require('./config/logger')


const sequelize = new Sequelize(postgres.options);

const checkDBConnection = async () => {
  try {
    await sequelize.authenticate()
    console.log('Соединение с БД было успешно установлено')
  } catch (e) {
    console.log('Невозможно выполнить подключение к БД: ', e)
    logger.error('Невозможно выполнить подключение к БД: ', e)
  }
}

module.exports = {
  sequelize,
  checkDBConnection
}