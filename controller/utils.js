const emailRegExp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
const dateStrRegExp = /^(0?[1-9]|[12]\d|30|31)\.(0?[1-9]|1[0-2])\.(\d{4}|\d{2})$/


function dateStrToDate(validDateStr) {
    const parsedStr = dateStrRegExp.exec(validDateStr)

    const strDay = parsedStr[1]
    const strMonth = parsedStr[2]
    const strYear = parsedStr[3]

    return new Date(strYear, +strMonth-1, strDay)
}


module.exports = {
    
    parseBodyStringToObj: (bodyStr) => {
        const values = {}
        const decodedbodyStr = decodeURIComponent(bodyStr).replace( /\+/g, ' ' )

        decodedbodyStr.split('&').forEach(keyValue => {
            
            const [ key, value ] = keyValue.split('=')
            values[key] = value.trim() ? value.trim() : null
        })
        return values;
    },

    validateEmailFormat: (email) => {
        return emailRegExp.test(email)
    },

    validateDateStrFormat: (dateStr) => {
        return dateStrRegExp.test(dateStr)
    },

    validateDate: (validDateStr) => {


        const newDate = dateStrToDate(validDateStr)
        const parsedStr = dateStrRegExp.exec(validDateStr)

        const strDay = parsedStr[1]
        const strMonth = parsedStr[2]
        const strYear = parsedStr[3]

        const dateDay = newDate.getDate()
        const dateMonth = newDate.getMonth()+1
        const dateYear = newDate.getFullYear()

        if (
            dateDay !== +strDay 
            || dateMonth !== +strMonth
            || dateYear !== +strYear
        ) {
                return false
        } else {
                return true
        }

    },

    validateBirthday: (validateStr) => {

        const now = new Date()

        const minAgeDate = new Date().setFullYear(now.getFullYear() - 18)
        const maxAgeDate = new Date().setFullYear(now.getFullYear() - 75)

        const minAgeMiliseconds = new Date(minAgeDate).getTime()
        const maxAgeMiliseconds = new Date(maxAgeDate).getTime()

        const validationMiliseconds = dateStrToDate(validateStr).getTime()

        if (validationMiliseconds >= maxAgeMiliseconds 
            && validationMiliseconds <= minAgeMiliseconds) {
                return true
        } else {
            return false
        }
        
    },

    validateSalaryFormat: (salary) => {

        if (salary === null) {
            return true
        } else {
           return !isNaN(salary) 
        }
        
    }

}