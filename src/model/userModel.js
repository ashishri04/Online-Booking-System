//email, password, name, age, phone number, gender
const mongoose = require("mongoose")
const userSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    age:{
        type:Number,
        require:true

    },
    phoneNumber:
    {
        type:Number,
        require:true
    },
    gender:{
        enum:[Male,female,others],
        require: true
    }
})

const User = mongoose.model('User',userSchema)

module.exports = User