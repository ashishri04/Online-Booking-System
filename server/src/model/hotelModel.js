const mongoose = require("mongoose")
const ObjectId =  mongoose.Types.ObjectId

const hotelSchema = new mongoose.Schema({
    hotelName: {
        type: String,
        required: true,
        trim: true
    },
    imageUrl : {
        type : String,
        required : true
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
    bookingId: [{
        type: ObjectId,
        ref: "Booking"
    }],
    userId: {
        type: ObjectId,
        ref: "User"
    }
}, { timestamps: true })


const hotel = mongoose.model("Hotel", hotelSchema)
module.exports = hotel
