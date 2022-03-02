const express=require('express')
const router=express.Router()

const validator = require('express-joi-validation').createValidator({
    passError:false
})

const UserController=require('../controllers/UserController')
const authenticate=require('../middleware/authenticate')
const {updateSchema}=require('../middleware/validate')


const validate=validator.body(updateSchema)


router.get('/',validate,UserController.index)
router.post('/show',UserController.show)
router.put('/update',authenticate,validate,UserController.update)
router.delete('/delete',UserController.destroy)

module.exports=router 