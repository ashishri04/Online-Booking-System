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
        enum:["Male","Female","Others"],
        require: true
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)
module.exports = User
