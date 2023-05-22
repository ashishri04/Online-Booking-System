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
        require:true 
    }, 
    idProof:{
        type:String,
        require:true
    },
    roomNumber:{
        type:Number,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    checkIn:{
        type:Date,
        require:true
    },
    checkOut:{
        type:Date,
        require:true
    },
    userId:{
        type:ObjectId,
        ref:user,
        require:true
    },
    
    
},{ timestamps: true });
const booking = mongoose.model('booking',bookingSchema)
module.export = booking
