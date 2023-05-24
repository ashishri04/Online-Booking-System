const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    phoneNumber:
    {
        type: Number,
        required: true
    },
    gender:{
        type : String,
        enum:["Male","Female","Others"],
       required: true
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)
module.exports = User
