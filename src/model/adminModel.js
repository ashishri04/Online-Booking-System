//email, password, name, 

const mongoose=require('mongoose');

const adminSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique: true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
},{timestamps:true});

module.export= mongoose.model("Admin",adminSchema);