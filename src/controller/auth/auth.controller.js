const Joi = require('joi');
const bcrypt = require("bcryptjs");
const { logger } = require('../../config/logger');
const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode")
const employeesService = require("../../services/user.service");
const {emitAuthFailedValidation} = require("../../services/eventEmitter.service");
const { user_role } = require('../../config/constants');
const { BadRequestError } = require('../utils');
const { ROLE_EMPLOYEE, ROLE_ADMIN } = user_role

const loginSchema = Joi.object({
    email: Joi.string()
        .empty()
        .email({ tlds: { allow: false } })
        .message('Invalid email')
        .required(),

    password: Joi.string()
        .empty()
        .alphanum()
        .min(3)
        .max(16)
        .required(),

}).unknown()


const me = async (req, res, next) => {

    try {
        const { token } = req.headers

        const decoded = jwtDecode(token)

        const user = await employeesService.getAuthUserById(decoded.id)
        res.json(user)

    } catch (error) {
        next(error)
    }

}

const login = async (req, res, next) => {

    try {

        const values = req.body
        const { value, error } = loginSchema.validate(values)


        if (error) {
            emitAuthFailedValidation(error.details[0].message)
            logger.info(error)
            throw new BadRequestError(error.details[0].message)

        } else {

            const { email, password } = value
            const user = await employeesService.getUserByEmailAuth(email)
            
            const hashPassword = user.password
            const departmentId = user.departmentid
            const userId = user.id
            const isValidPassword = await bcrypt.compareSync(password, hashPassword)

            if (isValidPassword) {
                const token = jwt.sign(
                    {
                        id: userId,
                        departmentid: departmentId,
                        role: user.role
                    },
                    process.env.JWT_KEY,
                    {expiresIn: "24h"}
                    //{expiresIn: "1s"}
                )

                res.json({
                    token: token
                })
            } else {
                logger.info("Password is invalid")
                throw new BadRequestError("Password is invalid")
            }
        }

    } catch (error) {
        next(error)
    }
}

module.exports = {
    me,
    login
}