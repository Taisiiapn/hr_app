const environment = require('./environment')

const { port, host, user, password, database } = environment.db

const postgres = {

  options: {
    host,
    port,
    database,
    username: user,
    password,
    dialect: 'postgres',
    logging: false
  }

}

module.exports = postgres