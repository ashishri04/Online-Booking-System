//email, password, name, 
const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
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
    addedHotels: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Hotel",
        }],
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);