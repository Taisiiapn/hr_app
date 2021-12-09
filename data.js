const { v4: uuidv4 } = require('uuid');

const generator = () => {

    const departments = []


    const amountDepartments = Math.floor(Math.random() * 3) + 1
    const amountEmployee = () => Math.floor(Math.random() * 6)
    const randomSalary = () => Math.floor(Math.random() * 10000) + 1000


    for (let i = 0; i < amountDepartments; i++) {

        const department = {
            id: uuidv4(),
            name: `Department${i+1}`,
            employees: []
        }
       
        if ( i !== 0 ) {

            for (let j = 0; j < amountEmployee(); j++) {

                const employee = {
                    id: uuidv4(),
                    name: `Person${uuidv4()}`,
                    salary: randomSalary()
                }
    
                department.employees.push(employee)
            }
        }

        

        departments.push(department)
    }
    

    return departments
}


module.exports = generator