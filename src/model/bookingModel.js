// //hotel name, phone, id proof, room number, price, checkin, checkout, userId, date,
// const  mongoose = require("mongoose")
// const hotel = require("./hotelModel")
// const user =require('./userModel')


// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     age: {
//         type: Number,
//         required: true
//     },
//     phoneNumber:
//     {
//         type: Number,
//         required: true
//     },
//     gender: {
//         type : String,
//         enum: ["Male", "Female", "Others"],
// Aman Mohadikar2:54 PM
//hotel name, phone, id proof, room number, price, checkin, checkout, userId, date,
const  mongoose = require("mongoose")
const hotel = require("./hotelModel")
const user =require('./userModel')

const bookingSchema = new mongoose.Schema({
    hotelName:{
        type:String
    },
    phone:{
        type:Number,
        required:true 
    }, 
    idProof:{
        type:String,
        required:true
    },
    roomNumber:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    checkIn:{
        type:Date,
        required:true
    },
    checkOut:{
        type:Date,
        required:true
    },
    userId:{
        type:ObjectId,
        ref:user,
        required:true
    },
    
    
},{ timestamps: true });
const booking = mongoose.model('booking',bookingSchema)
module.exports = booking
