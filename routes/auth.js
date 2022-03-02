const express = require('express')
const router = express.Router()

const validator = require('express-joi-validation').createValidator({
    passError:false
})

const AuthController = require('../controllers/AuthController')
const {createSchema}=require('../middleware/validate')


const validate=validator.body(createSchema)


router.post('/register',validate,AuthController.register)
router.post('/login', AuthController.login)

module.exports = router