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

    getEmployeesById: (cb) => {

        
        client.query(`SELECT *
                        FROM employee
                        WHERE departmentid='${id}';`, 
            (err, res) => {
                if (err) {
                    console.error('err', err.message)
                    cb(new Error('internal server error'))
                } else {
                    console.log('getAllEmployees', res.rows)
                    
                    cb(null, res.rows)
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
                    cb(null, res.rows);
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
                    cb(null, res.rows);
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
                    console.error('err', err.message)
                    cb(new Error('internal server error'))
                } else {
                    cb(null);
                }
        })
        
    },

    addDepartment: (values, cb) => {

        const { name } = values
  
        client.query(`INSERT INTO department(name) VALUES ('${name}');`,     
        (err, res) => {
                if (err) {
                    console.error('err', err.message)
                    cb(new Error('internal server error'))
                } else {
                    cb(null);
                }
        })
    },

    deleteDepartment: (id, cb) => {
        client.query(`DELETE FROM department 
                        WHERE id = '${id}';`, 
            (err, res) => {
                if (err) {
                    console.error('deleteDepartment', err.message)
                    cb(new Error('internal server error'))
                } else {
                    console.log('deleteDepartment', res.rows)
                    
                    cb(null);
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
                console.error('err', err.message)
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