
//hotel name, phone, id proof, room number, price, checkin, checkout, userId, date,
const mongoose = require("mongoose")

const ObjectId =  mongoose.Types.ObjectId


const bookingSchema = new mongoose.Schema({
    hotelId: {
        type: mongoose.Types.ObjectId,
        ref: "Hotel",
        required: true,
    },
    phone: {
        type: Number,
        required: true
    },
    idProof: {
        type: String,
        enum: ["adharCard", "votingCard", "panCard", "Other"],
        required: true
    },
    roomNumber: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    userId: {
        type: ObjectId,
        ref: "User",
        required: true
    }

}, { timestamps: true });
const booking = mongoose.model('Booking', bookingSchema)
module.exports = booking
