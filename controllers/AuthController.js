const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const register = async(req, res, next) => {
    // bcrypt.hash(req.body.password, 10, (err, hashedPass) => 
    // {
        // if (err) {
        //     res.status(400).json({
        //         error: err
        //     })
        // }
        try
        { 
            let hashedPass= await getPass(req.body.password)
            let user = new User({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: hashedPass,
                role:req.body.role
            })

        

        
            let  response= await user.save() 
            let regtoken = jwt.sign({ id: user.id ,role:user.role}, 'verySecretpass', { algorithm: 'HS256' }, { expiresIn: '1hr' })
            let id = user._id
            res.status(200).json({
                message: 'User Added Successfully!',res:response,
                regtoken, id
            })
        }
        catch(error){
            res.status(400).json({
                message: error.message
            })
        }
    //})
}

const login =async (req, res, next) => {
    try{
        var username = req.body.username
        var password = req.body.password

        let data= await User.findOne({ $or: [{ email: username }, { phone: username }] })
    
        let matchPass= await comparePass(password, data.password)
                        
        if (matchPass) {
            let logtoken = jwt.sign({ id: data.id , role:data.role}, 'verySecretpass', { algorithm: 'HS256' }, { expiresIn: '1hr' })
            let id = data._id
            res.status(400).json({
                message: 'Login Successful!',
                res:data,
                logtoken, id
            })
        } 
        else {
            res.status(200).json({
                message: 'Password does not match'
            })
        }
    }             
    catch(err){
            console.log(err);
      
    }
}

async function getPass(pass){
    return bcrypt.hash(pass, 10)
}
async function comparePass(password, compassword){
    return bcrypt.compare(password, compassword)
}
module.exports = {
    register, login
}