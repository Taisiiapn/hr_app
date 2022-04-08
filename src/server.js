const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { logger } = require('./config/logger')
const departmentsRouter = require('./controller/departments/department.router')
const commonController = require('./controller/common');
const employeesRouter = require('./controller/users/users.router')
const { Sequelize } = require('sequelize')
const postgres = require('./config/sequelize')
const cookieParser = require('cookie-parser')



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.get('/', commonController.rootRouteRedirect)
app.get('/login', (req, res) => employeesRouter.loginRootRoute(req, res))
//app.get('/logOut', (req, res) => employeesRouter.logOutRoute(req, res))
app.get('/departments', (req, res) => departmentsRouter.departmentsRootRoute(req, res))
app.get('/departments/create', (req, res) => departmentsRouter.addDepartmentRoute(req, res))
app.get('/departments/:departmentId', (req, res) => employeesRouter.employeesRoute(req, res))
app.get('/departments/:departmentId/update', (req, res) => departmentsRouter.editDepartmentRoute(req, res))
app.get('/departments/:departmentId/employees/create', (req, res) => employeesRouter.addEmployeeRoute(req, res))
app.get('/departments/:departmentId/employees/:employeeId/update', (req, res) => employeesRouter.editEmployeeRoute(req, res))
app.post('/login', (req, res) => employeesRouter.loginAction(req, res))
app.post('/departments/create', (req, res) => departmentsRouter.addDepartmentAction(req, res))
app.post('/departments/:departmentId/delete', (req, res) => departmentsRouter.deleteDepartmentAction(req, res))
app.post('/departments/:departmentId/update', (req, res) => departmentsRouter.editDepartmentAction(req, res))
app.post('/departments/:departmentId/employees/create', (req, res) => employeesRouter.addEmployeeAction(req, res))
app.post('/departments/:departmentId/employees/:employeeId/update', (req, res) => employeesRouter.editEmployeeAction(req, res))
app.post('/departments/:departmentId/employees/:employeeId/delete', (req, res) => employeesRouter.deleteEmployeeAction(req, res))
app.use('*', (req, res) => commonController.routeNotFound(req, res))


async function connectToDB() {
    const sequelize = new Sequelize(postgres.options)

    try {
        await sequelize.authenticate()
        logger.info('Соединение с БД было успешно установлено')
        return sequelize
      } catch (e) {
        logger.error('Невозможно выполнить подключение к БД: ', e)
    }
}

const postgresClient = connectToDB()
postgres.client = postgresClient

const port = process.env.SERVER_PORT || 3000
app.listen(port, () => logger.info(`Listening on port ${port}...`))

//отримали з беку токен, поклали в кукіс та редірект на хоум


//если проверка паролей проходит, то
//взять айди этого пользователя, сделать жвт
//и положить в кукисы

//А на бекенді порівняти пароль з хешем


//пароль треба зіставити з хешем котрий лежить у базі
//у базі лежать тільки хещі
//якщо все ок то кодись у кукі покласти згенерований токен
//на клієнті (в кукісах) треба берегти джвт токен
//в базі треба берегти хеш паролю
//тобто jwt - це токен
//а bcrypt - це хещі