const dateStrRegExp = /^(0?[1-9]|[12]\d|30|31)\.(0?[1-9]|1[0-2])\.(\d{4}|\d{2})$/


const dateStrToDate = validDateStr => {
    const parsedStr = dateStrRegExp.exec(validDateStr)

    const strDay = parsedStr[1]
    const strMonth = parsedStr[2]
    const strYear = parsedStr[3]

    return new Date(strYear, +strMonth-1, strDay)
}

const proceedError = (error) => {
    let result;
    if (error.status) {
        result = error
    } else {
        throw new InternalError()
    }
    return result
}

const validDateCheck = (dateStr) => {

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
        throw new BadRequestError('Invalid date');
    }

    return dateStr

}

const ageRequirementCheck = (birthdayStr) => {

    const now = new Date()

    

    const minAgeDate = new Date().setFullYear(now.getFullYear() - 18)
    const maxAgeDate = new Date().setFullYear(now.getFullYear() - 75)

    const minAgeMiliseconds = new Date(minAgeDate).getTime()
    const maxAgeMiliseconds = new Date(maxAgeDate).getTime()

    const validationMiliseconds = dateStrToDate(birthdayStr).getTime()

    if (validationMiliseconds <= maxAgeMiliseconds 
        || validationMiliseconds >= minAgeMiliseconds) {
            throw new Error ('')

    }

    return birthdayStr

}

const joiErrorDetailsToErrorObjDTO = (details) => {

    return details.reduce((accum, current) => {
        const key = current.path;
        const value = current.message;
        accum[key] = value
        return accum
    }, {})
}

const singleErrorToErrorObjDTO = (key, value) => {
    return {
        [key]: value
    }
}

const commonErrorToErrorObjDTO = (value) => {
    return {
        ['_common']: value
    }
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

class ValidationError extends Error {
    constructor(errorsObjJSON) {
        super(errorsObjJSON)
        this.status = 400
    }
}


module.exports = {

    dateStrRegExp,

    proceedError,

    validDateCheck,

    ageRequirementCheck,

    joiErrorDetailsToErrorObjDTO,

    singleErrorToErrorObjDTO,

    commonErrorToErrorObjDTO,

    NotFoundError,

    InternalError,

    BadRequestError,

    ValidationError

}