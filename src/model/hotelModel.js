const mongoose = require("mongoose")

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
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    facilities: [{
        type: String,
        trim: true
    }],
    room_no: {
        type: Number,
        required: true
    },
    room_type: {
        type: String,
        enum: ["single", "double", "suite"],
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })


module.export = mongoose.model("hotel", hotelSchema)
