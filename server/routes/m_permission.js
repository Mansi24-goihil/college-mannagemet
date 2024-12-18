const express =require('express');
const router= express.Router();
const User= require('../models/User');
const Admin= require('../models/Admin');
const SuperAdmin= require('../models/SuperAdmin');
const Permission = require('../models/Permission');

// // helper function to select the model on based roles 
function getModel(role){
    switch(role.toLowerCase()){
        case 'superadmin':
            return SuperAdmin;
        case 'admin':
            return Admin;
        case 'user':
            return User;
        default:
            throw new Error("Invalid role");
    }
}
router.get('/:role',async(req,res)=>{
    const {role}= req.params;

    const Model = getModel(role);

    if(!Model)
        return res.status(400).json({message:"Invalid Role"});

    try{
        const users = await Model.find().populate('permissions');
        res.status(200).json(users);
    }catch(error){
        res.status(400).json({error:error.message});
    }
})

router.put('/:role/:userId',async(req,res)=>{
    const {role,userId}= req.params;
    const {permissions} =req.body;

    const Model = getModel(role);
    if(!Model)
        return res.status(400).json({message:"Invalid Role "});

    const users = Model.findById(userId);
    if(!users)
        return res.status(404).json({message:"User Not Found"});

    const validPemissions =await Permission.find({'_id':{$in : permissions }})
    if(validPemissions.length !== permissions.length){
        return res.status(404).json({message:"Invalid Permissions"});
    }

    const updateUser =await Model.updateOne({_id:userId},{$set:{permissions}});
    
    if(updateUser.nModified == 0){
        return res.status(400).json({message:"User Not Found"});
    }
    
    res.status(200).json({message:"Success"});

})


router.get('/:role/:userId',async(req,res)=>{
    const {role,userId}=req.params;

    const Model = getModel(role);

    if(!Model)
        return res.status(400).json({message:"Invalid Roles"});

    try{
        const user =await Model.findById(userId).select("name email permissions");
        if(!user){
            return res.status(400).json({message:"User not Found"});
        }
        res.status(200).json({user})
    }catch(error){
        res.status(400).json({error:error.message});
    }
});

module.exports=router;