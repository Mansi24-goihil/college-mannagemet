const  mongoose= require('mongoose');
const AdminSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Role'
    }
})

module.exports=mongoose.model('Admin',AdminSchema)