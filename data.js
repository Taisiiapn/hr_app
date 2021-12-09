const { v4: uuidv4 } = require('uuid');

const generator = () => {

    const departments = []


    const amountDepartments = Math.floor(Math.random() * 10) + 1
    const amountEmployee = Math.floor(Math.random() * 6)
    const randomSalary = () => Math.floor(Math.random() * 10000) + 1000


    for (let i = 0; i < amountDepartments; i++) {

        departments.push({
            id: uuidv4(),
            name: `Department${i++}`,
            employee: []
        })

    }
    
    for (let k = 0; k < departments.length; k++) {

        for (let j = 0; j < amountEmployee; j++) {
            departments[k].employee.push({
                id: uuidv4(),
                name: `Person${uuidv4()}`,
                salary: randomSalary()
            })
        }
    }


    return departments
}


module.exports = generator