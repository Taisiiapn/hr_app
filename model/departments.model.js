const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    password: 'qwertyuiop',
    host: 'localhost',
    port: 5432,
    database: 'js_test'
})

client.connect()

module.exports = {

    getAllDepartments: (cb) => {

        
        client.query('SELECT * FROM department;', 
        
            (err, res) => {
                if (err) {
                    
                    cb(new Error('internal server error'))

                } else {

                    if (res.rows.length === 0) {
                        cb(new Error(`Departments not found!`))
                    } else {
                        cb(null, res.rows)
                    }
                }
        })
    },

    getDepartmentById: (id, cb) => {

        client.query(`SELECT *
                    FROM department
                    WHERE id='${id}';`, 

            (err, res) => {
                if (err) {

                    cb(err)

                } else {

                    if (res.rows.length === 0) {
                        cb(new Error(`Department with id - ${id}, nothing found!`))
                    } else {
                        cb(null, res.rows)
                    }

                }
        })
    },

    getDepartmentByIdWithEmployees: (id, cb) => {

        client.query(`SELECT 
                        d.id, d.name, e.id as e_id, e.name as e_name, e.salary as e_salary 
                    FROM department d 
                    LEFT JOIN employee e 
                    ON e.departmentid = d.id 
                    WHERE d.id = '${id}';`, 
            (err, res) => {
                if (err) {

                    cb(err)

                } else {

                    cb(null, res.rows)

                }
        })
    },

    editDepartment: (id, values, cb) => {

        const { name } = values
        
        client.query(`UPDATE department 
                        SET name = '${name}' 
                        WHERE id = '${id}';`, 
            (err, res) => {
                if (err) {

                    cb(new Error('internal server error'))

                } else {

                    cb(null)

                }
        })
        
    },

    addDepartment: (values, cb) => {

        const { name } = values
  
        client.query(`INSERT INTO department(name) VALUES ('${name}');`,     
            (err, res) => {
                    if (err) {

                        cb(new Error('internal server error'))

                    } else {

                        cb(null)

                    }
            })
    },

    deleteDepartment: (id, cb) => {

        client.query(`DELETE FROM employee
                        WHERE departmentid='${id}';`,
        
            (deleteEmployeesError, res) => {
                if (deleteEmployeesError) {

                    cb(new Error('internal server error'))

                } else {
                    client.query(`DELETE FROM department
                            WHERE id='${id}';`,
                    (deleteDepError, res) => {
                        if (deleteDepError) {
                            cb(new Error('internal server error'))
                        } else {
                            cb(null);
                        }
                    })
                    
                }
        })
    },

    isTheSameDepartmentNameExists: (values, cb) => {

        const { name } = values

        client.query(`SELECT name
                        FROM department
                        WHERE name ILIKE '${name}';`, 
            
        (err, res) => {
            if (err) {

                cb(new Error('internal server error'))

            } else {

                if(res.rows.length !== 0) {
                    cb(null, true)
                } else {
                    cb(null, false)
                }
                
            }
        })
    }

}