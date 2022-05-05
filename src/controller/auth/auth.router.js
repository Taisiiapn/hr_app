const {Router} = require("express");
const authController = require('./auth.controller');
const { tokenRequired } = require("./auth.middleware");
const router = Router()

router.route('/login').post(authController.login)
router.route('/me').get(tokenRequired, authController.me)

module.exports = router;