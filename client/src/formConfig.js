export const getInputDefaultValue = (type) => {
    switch (type) {
        case 'text':
            return ''

        case 'password':
            return ''

        case 'checkbox':
            return false

        default:
            return ''
    }
}


export const formLoginConfig = [
    
    {
        name: "email", 
        type: "text",
        placeholder: "Enter your email",
    },
    {
        name: "password", 
        type: "password",
        placeholder: "Enter your password",
        
    },

]

export const formDepartmentConfig = [
    
    {
        name: "name", 
        type: "text",
        placeholder: "Enter department's name",
    }

]

export const formUserConfig = [
    
    {
        name: "firstName", 
        type: "text",
        placeholder: "Enter firstName",
    },
    {
        name: "lastName", 
        type: "text",
        placeholder: "Enter lastName",
    },
    {
        name: "salary", 
        type: "number",
        placeholder: "Enter salary",
    },
    {
        name: "birthday", 
        type: "date",
        placeholder: "Enter birthday",
    },
    {
        name: "email", 
        type: "email",
        placeholder: "Enter email",
    },
    {
        name: "role", 
        type: "select",
        values: [
            'ROLE_EMPLOYEE', 'ROLE_ADMIN'
        ],
    }

]