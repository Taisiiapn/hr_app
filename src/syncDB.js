const User = require('./model/user')
const Department = require('./model/department')
const Logs = require('./model/logs')
const postgres = require('./config/sequelize')
const { Sequelize } = require('sequelize')
const path = require('path')
const fs = require('fs')
 


const sequelize = new Sequelize(postgres.options);

module.exports = connectToDB = async () => {


    await sequelize.authenticate()
    
    .then(() => {

        console.log('Соединение с БД было успешно установлено')

        const db = {}
        const models = path.join(__dirname, 'model') // path to a models' folder

        fs.readdirSync(models)
            .filter(file => (file.indexOf('.') !== 0)  && (file.slice(-3) === '.js'))
            .forEach(file => {
            // let model = sequelize['import'](path.join(models, file))
            let model = path.join(models, file) //(sequelize, Sequelize.DataTypes)
            db[model.name] = model
            })

        Object.keys(db).forEach(modelName => {
            if (db[modelName].associate) {
            db[modelName].associate(db)
            }
        })

        sequelize.sync({
            force: true
        })
        .then(() => console.log('sequelize.sync: Все таблицы были созданы!'))
        .catch(error => console.log('sequelize.sync error:', error))

        return sequelize

    })
    .catch (e => {
        console.log('Невозможно выполнить подключение к БД: ', e)
        logger.error('Невозможно выполнить подключение к БД: ', e)
    })
}

module.exports = sequelize


// id: 821faf2c-6aaf-4fd8-8aa6-0226d913b959
// admin@admin.admin	ROLE_ADMIN
// $2a$12$2MI1v6vB5oCG4POYZektCeiZTzSFcFlOkxmur3Ly1Y/KSuX2yfF5O