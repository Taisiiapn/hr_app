const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    password: 'qwertyuiop',
    host: 'localhost',
    port: 5432,
    database: 'js_test'
})

function finishProgram() {
    client.end()
}

client.connect()
    .then(() => {

        client.query('SELECT * FROM "department";', 
            (err, res) => {
                if (err) {
                    console.error('err', err.message)
                    finishProgram()
                } else {
                    console.log('res depart', res.rows)
                }
        })

    })