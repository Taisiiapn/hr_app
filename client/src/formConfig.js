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