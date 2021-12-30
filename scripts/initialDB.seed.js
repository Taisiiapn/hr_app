const { Client } = require('pg')
const data = require('../index')

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

        data.forEach((department, index, arr) => {

            const isLastDepartment = arr.length - 1 === index

            client.query('INSERT INTO "department" (id, name) VALUES ($1, $2);',
                [department.id, department.name], 
                (err, res) => {
                    if (err) {
                       console.error('err', err.message)
                       finishProgram()
                    } else {
                        console.log('res depart', res.row)
                        
                        if (department.employees.length !== 0) {

                            const resultString = department.employees.reduce((string, person, currentIndex, arr) => {
                                const isLast = arr.length - 1 === currentIndex
                                const concatString = `('${person.id}', '${person.name}', '${department.id}')${isLast ? ';' : ', '}`
                                return string + concatString
                            }, 'INSERT INTO employee (id, name, departmentid) VALUES ')
                            client.query(resultString,
                                (err, res) => {
                                    if (err) {
                                        console.error('err', err.message)
                                        finishProgram()
                                    } else {
                                        console.log('res person', res.row)
                                        isLastDepartment && finishProgram()
                                    }
                                }
                            )
                        } else {
                            isLastDepartment && finishProgram()
                        }
                    }
            })
        })

    })