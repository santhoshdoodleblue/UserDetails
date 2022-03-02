const Joi = require('joi')
const passwordComplexity = require("joi-password-complexity");

const updateSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    password: Joi.string().required(),
    role:Joi.string().required()
})


const createSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    password:new passwordComplexity({
        min: 8,
        max: 25,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 4
      }) 
    ,
    role:Joi.string().required()
})




module.exports={updateSchema,createSchema}
