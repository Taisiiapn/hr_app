const environment = require('./environment')
const Department = require('../model/department.model')
const Employee = require('../model/employee.model')

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