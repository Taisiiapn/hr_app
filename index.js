const generator = require('./data')

const data = generator()

console.log('data', data)

function countAverageSalary (data) {
    
    const resultAverage = data.map(department => department.employee
                    .reduce((a, b) => (a + b.salary) 
                    / department.employee.length, 0)
                )

    return resultAverage
}   

const averageSalary = countAverageSalary(data)
// const averageSalaries = data.map(item => countAverageSalary(item))
console.log('averageSalary', averageSalary)
// console.log('averageSalaries', averageSalaries)

////////////////////////////


function sumSalary (data) {

    const resultSum = data.map(department => department.employee
            .reduce((a, b) => a + b.salary, 0)
    )

    return resultSum
}

console.log('sumSalary', sumSalary(data))


////////////////////////////


function toFilterArr (data) {
    
    const filteredArr = data.map(department => department.employee
            .filter(person => person.salary < department.employee.reduce(
                (a, b) => (a + b.salary) / department.employee.length, 0
            ))
    )

    return filteredArr
}

console.log('toFilterArr', toFilterArr(data))


////////////////////////////


function objectDepartments () {
    const employees = []

    data.forEach(department => {
        

        for (let k = 0; k < department.employee.length; k++) {
            employees.push({
                name: department.name,
                employeeName: department.employee.length !== 0 
                            && department.employee[k].name,
                employeeDifSalary: department.employee.length !== 0 
                            && (department.employee[k].salary - department.employee.reduce((a, b) => (a + b.salary) 
                                                                            / department.employee.length, 0))                       
            })
        }
        
    })
    
    
    return employees
}

console.log('New object departments', objectDepartments(data))