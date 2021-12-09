const generator = require('./data')

const data = generator()


console.log('data', JSON.stringify(data, null, 2))

function countAverageSalary (department) {
    
    return department.employees.length && department.employees.reduce(function(a, b){
                            return (a + b.salary) 
                            
                        },0
                    )/ department.employees.length    
}   

const averageSalaries = data.map(function (departament) {
    const resultObj = {
        name: departament.name,
        avgSalary: countAverageSalary(departament)
    }

    return resultObj
})

console.log('\n\n','averageSalaries', averageSalaries)

////////////////////////////


function countSumSalary (department) {

    return department.employees.reduce(function(a, b) {
                            return a + b.salary
                        }, 0)
}

const sumSalaries = data.map(function (department) {
    const resultObj = {
        name: department.name,
        sumSalary: countSumSalary(department)
    }
    
    return resultObj
})

console.log('\n\n', 'sumSalary', sumSalaries)


////////////////////////////


function filterEmployees (department) {

    const reducedResult = countAverageSalary(department)
    
    return department.employees.filter(function (person) {
         return person.salary < reducedResult
    })
}

const filterDepartmentsEmployees = data.map(function (department) {
    const resultObj = {
        name: department.name,
        person: filterEmployees(department)
    }

    return resultObj
})

console.log('\n\n','Filter Employees', JSON.stringify(filterDepartmentsEmployees,null, 2))


////////////////////////////


function objectDepartments (departments) {
    const employees = []

    departments.forEach(department => {
        

        for (let k = 0; k < department.employees.length; k++) {
            employees.push({
                name: department.name,
                employeesName: department.employees.length !== 0 
                            && department.employees[k].name,
                employeesDiffSalary: department.employees.length !== 0 
                            && (department.employees[k].salary - department.employees.reduce((a, b) => (a + b.salary) 
                                                                            / department.employees.length, 0))                       
            })
        }
        
    })
    
    
    return employees
}

console.log('\n\n','New object departments', JSON.stringify(objectDepartments(data), null, 2))
