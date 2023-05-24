const hotelModel = require("../model/hotelModel")
const validator = require("../validator/validator")
const mongoose = require("mongoose")



const createHotel = async (req, res) => {
    try {

        let data = req.body
        let { hotelName, address, email, description, rating, room_no, room_type } = data
        if (!(hotelName && address && email && description && rating && room_no && room_type)) return res.status(400).send({ status: false, message: "All field is mandatory" })

        if (!validator.validString(hotelName)) return res.status(404).send({ status: false, message: "Hotel Name must be valid" })
        if (!validator.validString(address)) return res.status(404).send({ status: false, message: "Address must be valid" })
        if (!validator.validEmail(email)) return res.status(404).send({ status: false, message: "Email must be valid" })
        if (!validator.validString(description)) return res.status(404).send({ status: false, message: "description must be valid" })
        if (!validator.validNumber(room_no)) return res.status(404).send({ status: false, message: "Room_no must be valid" })
        if (!validator.validNumber(rating)) return res.status(404).send({ status: false, message: "Rating must be valid" })

        if (room_type != "single" && room_type != "double" && room_type != "suite") return res.status(404).send({ status: false, message: "Room type must be valid" })

        const isEmailPresent = await hotelModel.findOne({ email: email })
        if (isEmailPresent) return res.status(404).send({ status: false, message: "Email is already exist" })

        let newData = await hotelModel.create(data)
        return res.status(200).send({ status: true, message: newData })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



const getAllHotel = async (req, res) => {
    try {
        let obj = { availability: true }

        const data = await hotelModel.find(obj)
        if (data.length < 1) return res.status(200).send({ status: true, message: "Hotels are not available" })
        return res.status(200).send({ status: true, message: data })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



const getHotelById = async (req, res) => {
    try {
        let hotelId = req.params.hotelId
        if (!mongoose.isValidObjectId(hotelId)) return res.status(400).send({ status: false, message: "Hotel Id not valid" })

        let isIdPresent = await hotelModel.findOne({ _id: hotelId, availability: true })
        if (!isIdPresent) return res.status(404).send({ status: false, message: "Hotel Id not exist or This hotel is not available right now" })

        return res.status(200).send({ status: true, message: isIdPresent })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



const updateHotel = async (req, res) => {
    try {
        let data = req.body
        let { hotelName, address, description, rating, facilities, room_type, availability } = data
        const hotelId = req.params.hotelId

        let isHotelPresent = await hotelModel.findById(hotelId)


        if (!isHotelPresent) return res.status(404).send({ status: false, message: "Hotel Id not exist" })

        if (!mongoose.isValidObjectId(hotelId)) return res.status(400).send({ status: false, message: "Hotel Id not valid" })

        let newData = await hotelModel.findByIdAndUpdate({ _id: hotelId }, { $set: { hotelName, description, address, rating, room_type, availability }, $push: { facilities } }, { new: true })
        return res.status(201).send({ status: true, message: "Hotel Update Seccessfully", newData: newData })

    }
    catch (error) {
        return res.status
    }
}


const deleteHotel = async (req, res) => {
    try {
        const hotelId = req.params.hotelId
        if (!mongoose.isValidObjectId(hotelId)) return res.status(400).send({ status: false, message: "Hotel Id not valid" })
        let isIdPresent = await hotelModel.findOne({ _id: hotelId })
        if (!isIdPresent) return res.status(404).send({ status: false, message: "Hotel Id not exist" })
        await hotelModel.findByIdAndDelete({ _id: hotelId })
        return res.status(200).send({ status: false, message: "Hotel delete Successfully" })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



module.exports = { createHotel, getAllHotel, getHotelById, updateHotel, deleteHotel }

