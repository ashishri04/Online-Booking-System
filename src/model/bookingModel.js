//hotel name, phone, id proof, room number, price, checkin, checkout, userId, date,
const  mongoose = require("mongoose")
const hotel = require("./hotelModel")
const user =require('./userModel')
const ObjectId = mongoose.Schema.Types.ObjectId

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
        ref:"User",
        required:true
    },
    
    
},{ timestamps: true });
const booking = mongoose.model('booking',bookingSchema)
module.exports = booking
