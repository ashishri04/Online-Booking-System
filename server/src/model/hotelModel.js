const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const hotelSchema = new mongoose.Schema({
    hotelName: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    description: [{
        type: String,
        required: true
    }],
    rating: {
        type: Number,
        required: true
    },
    facilities: [{
        type: String,
        trim: true
    }],
    rooms: [{
        type: Number,
        required: true
    }],
    room_type: {
        type: String,
        enum: ["single", "double", "suite"],
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    },
    bookingId:{
        type:ObjectId,
        ref:"booking",
        required:true 
    },
    userId:{
        type:ObjectId,
        ref:"user",
        required:true 
    }
}, { timestamps: true })


const hotel = mongoose.model("hotel", hotelSchema)
module.exports = hotel
