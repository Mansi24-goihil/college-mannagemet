const mongoose =require('mongoose');

const PremissionSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('Permission',PremissionSchema)