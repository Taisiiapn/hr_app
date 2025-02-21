const jwt = require("jsonwebtoken");
const { user_role } = require("../../config/constants");
const { TokenExpiredError } = require("../utils");
const { ROLE_ADMIN, ROLE_EMPLOYEE } = user_role

const isAdminRole = (req, res, next) => {
    
    const user = req.user
    const { role } = req.query
    if (user.role === ROLE_ADMIN) {
        next()
    } else if (user.role === ROLE_EMPLOYEE) {
        res.sendStatus(401)
    } else {
        res.sendStatus(401) 
    }
}

const isAdminRoleOrEmployeeWithRelevantParamsId = (req, res, next) => {

    const user = req.user
    const { departmentId } = req.params

    if (user.role === ROLE_EMPLOYEE) {
        user.departmentid === departmentId 
            ? next() 
            : res.sendStatus(401)
    } else if (user.role === ROLE_ADMIN) {
        next()
    } else {
        res.sendStatus(401)
    }
}

const isAdminRoleOrEmployeeWithRelevantQueryId = (req, res, next) => {
    
    const user = req.user
    const { departmentId } = req.query

    if (user.role === ROLE_EMPLOYEE) {
        departmentId === user.departmentid 
            ? next() 
            : res.sendStatus(401)
    } else if (user.role === ROLE_ADMIN) {
        next()
    } else {
        res.sendStatus(401)
    }
}

const complexGetAllUsersCheck = (req, res, next) => {

    const { id, departmentid, role } = req.user
    const query = req.query

    const isOnlyRoleSpecified =
        query.role !== undefined
        && query.departmentId === undefined

    const isOnlyDepartmentIdSpecified =
        query.role === undefined
        && query.departmentId !== undefined

    const isRoleAndDepartmentIdSpecified =
        query.role !== undefined
        && query.departmentId !== undefined

    const isRoleAndDepartmentIdNotSpecified =
        query.role === undefined
        && query.departmentId === undefined

    if (isOnlyRoleSpecified
        || isOnlyDepartmentIdSpecified
        || isRoleAndDepartmentIdNotSpecified) {
        isAdminRole(req, res, next)
    }

    if (isRoleAndDepartmentIdSpecified) {
        isAdminRoleOrEmployeeWithRelevantQueryId(req, res, next)
    }

}


const tokenRequired = async (req, res, next) => {

    const { token } = req.headers

    if (token === undefined) {
        res.sendStatus(401)
    } 
    
    await jwt.verify(
        token,
        process.env.JWT_KEY,
        (err, result) => {
            if (err) {

                next(new TokenExpiredError())

            } else {
                req.user = result
                next()
            }
        }
    )
}

module.exports = {
    isAdminRole,
    isAdminRoleOrEmployeeWithRelevantParamsId,
    isAdminRoleOrEmployeeWithRelevantQueryId,
    tokenRequired,
    complexGetAllUsersCheck
}