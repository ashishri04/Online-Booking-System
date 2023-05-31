//email, password, name, 
const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
  
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