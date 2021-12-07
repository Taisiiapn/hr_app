const departments = [
    {
        id: 1,
        name: 'Department 1',
        employee: [
            {
                id: 1,
                name: 'employee 1',
                salary: 1000
            },
            {
                id: 2,
                name: 'employee 2',
                salary: 2000
            },
            {
                id: 3,
                name: 'employee 3',
                salary: 3500
            },
        ] 
    },
    {
        id: 2,
        name: 'Department 2',
        employee: [
            {
                id: 4,
                name: 'employee 4',
                salary: 3000
            },
            {
                id: 5,
                name: 'employee 5',
                salary: 4500
            },
            {
                id: 6,
                name: 'employee 6',
                salary: 6000
            },
        ] 
    },
    {
        id: 3,
        name: 'Department 3',
        employee: [
            
        ] 
    },
]


const averageSalary = data => data.map(department =>
    department.employee.reduce((a, b) => (a + b.salary) / department.employee.length, 0)
)

console.log('averageSalary', averageSalary(departments))


////////////////////////////


const sumSalary = data => data.map(department => 
    department.employee.reduce((a, b) => a + b.salary, 0)
)

console.log('sumSalary for each department', sumSalary(departments))


////////////////////////////


const filteredArr = data => data.map(department => department.employee
        .filter(person => person.salary 
            < department.employee.reduce(
                (a, b) => (a + b.salary) / department.employee.length, 0
            ))
        ) 

console.log('People with salary less than average', filteredArr(departments))


////////////////////////////


function objectDepartments (data) {
    const newDepartments = Object.assign({}, data)
    return newDepartments
}

console.log('New object departments', objectDepartments(departments))