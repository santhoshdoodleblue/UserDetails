const User=require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//show the list of users
const index=async (req,res,next)=>{
    try{ 
        let data=await User.find()
        
        res.status(200).json({
            response:data
        })
    }
   
        catch(error)
        {
            res.status(400).json({
                message:'Error in list of user display'
            })
        }
}

//return single user
const show=async(req,res,next)=>{
    try{
        let userID=req.body.userID
        let data=await User.findById(userID)
        res.status(200).json({
            response:data
        })
    }
    catch(error)
    {
            res.status(400).json({
                message:'Error in listing single user display'
            })
    }
}


// update user
const update=async (req,res,next)=>{
    try{
        let userID=req.body.id
        let {name,role}=req.body
        //email,phone
        // if(req.body.password){
        //     req.body.password = await bcrypt.hash(req.body.password, 10);
        // }
            
        let updatedData = {}
        if(name){updatedData.name= name}
        if(role){updatedData.role=role}
        // if(password){updatedData.password=password}
        // if(email){updatedData.email=email}
        // if(phone){updatedData.phone=phone}

        let data= await User.findByIdAndUpdate(userID,{$set:updatedData},{new:true})
        res.status(200).json({
            message:'User updated successfully',
            response:data
        })
    }
    catch(error){
        res.status(400).json({
            message:'Error in updating  user'
        })
    }
}


//delete an user
const destroy=async(req,res,next)=>{
    try{
        let userID=req.body.userID
        let data=await User.findByIdAndRemove(userID)
        res.status(200).json({
            message:'User deleted successfully'
        })
    }
        catch(error){
            res.status(400).json({
                message:'Error in deleting  user'
            })
        }
}


module.exports={
    index,show,destroy,update
}