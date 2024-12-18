const mongoose = require('mongoose');

const SubmenuSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    permissions:[{type:mongoose.Schema.Types.ObjectId,ref:'Permission'}],
    status: { type: Boolean, default: false } 
});

const pageSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    permissions:[{type:mongoose.Schema.Types.ObjectId,ref:'Permission'}],
   submenus:{type: [SubmenuSchema], default: []},
   status: { type: Boolean, default: false } 
});

const MenuSchema = new mongoose.Schema ({
    name:{
        type:String,
        require:true
    },
    pages:[pageSchema],
    status: { type: Boolean, default: false }
});

const RoleSchema =new mongoose.Schema({
    name:{
            type:String,
            required:true
        },
    menus:[MenuSchema]
});

module.exports =mongoose.model('Role',RoleSchema);
