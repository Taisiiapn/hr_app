const generator = require('./data')

const data = generator()

console.log('data', data)

function countAverageSalary (department) {
    
    return department.employees.reduce(function(a, b){
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

console.log('averageSalaries', averageSalaries)

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

console.log('sumSalary', sumSalaries)


////////////////////////////


function filterEmployees (department) {
    
    return department.employees.filter(person => person.salary < department.employees.reduce(
        function(a, b) {
            a + b.salary
        }
    ) / department.employees.length, 0)
}

const filterDepartmentsEmployees = data.map(function (department) {
    const resultObj = {
        name: department.name,
        person: filterEmployees(department)
    }

    return resultObj
})

console.log('Filter Employees', filterDepartmentsEmployees)


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

console.log('New object departments', objectDepartments(data))