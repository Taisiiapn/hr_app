const dotenv = require('dotenv')
dotenv.config()

module.exports = Object.freeze({

    port: process.env.SERVER_PORT,
    host: process.env.HOST,
    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    }
})