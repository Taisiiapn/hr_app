const environment = require('./environment')
require('dotenv').config();

const { host, user, password, database } = environment.db

const postgres = {

  options: {
    host,
    database,
    username: user,
    password,
    dialect: 'postgres',
    logging: false
  }

}

module.exports = postgres