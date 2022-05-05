const dateStrRegExp = /^(0?[1-9]|[12]\d|30|31)\.(0?[1-9]|1[0-2])\.(\d{4}|\d{2})$/


function dateStrToDate(validDateStr) {
    const parsedStr = dateStrRegExp.exec(validDateStr)

    const strDay = parsedStr[1]
    const strMonth = parsedStr[2]
    const strYear = parsedStr[3]

    return new Date(strYear, +strMonth-1, strDay)
}

class NotFoundError extends Error {

    constructor() {
        const message = 'Not found!'
        super(message)
        this.status = 404
    }
}

class InternalError extends Error {
    constructor() {
        let message = 'Internal server error';
        super(message)
        this.status = 500;
    }
}

class BadRequestError extends Error {
    constructor(message) {
        super(message)
        this.status = 400
    }
}


module.exports = {

    dateStrRegExp,

    proceedError: (error) => {
        let result;
        if (error.status) {
            result = error
        } else {
            result = new InternalError()
        }
        return result
    },

    validDateCheck: (dateStr) => {

        const newDate = dateStrToDate(dateStr)
        const parsedStr = dateStrRegExp.exec(dateStr)

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
            throw new Error('Invalid date');
        }

        return dateStr

    },

    ageRequirementCheck: (birthdayStr) => {

        const now = new Date()

        

        const minAgeDate = new Date().setFullYear(now.getFullYear() - 18)
        const maxAgeDate = new Date().setFullYear(now.getFullYear() - 75)

        const minAgeMiliseconds = new Date(minAgeDate).getTime()
        const maxAgeMiliseconds = new Date(maxAgeDate).getTime()

        const validationMiliseconds = dateStrToDate(birthdayStr).getTime()

        if (validationMiliseconds <= maxAgeMiliseconds 
            || validationMiliseconds >= minAgeMiliseconds) {
                throw new Error('');

        }

        return birthdayStr

    },

    NotFoundError,

    InternalError,

    BadRequestError

}