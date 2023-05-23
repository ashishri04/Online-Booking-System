const hotelModel = require("../model/hotelModel")
const validator = require("../validator/validator")

const createHotel = async (req, res) => {
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




module.exports = { createHotel }

// create hotel, get all hotel, get hotel by id, update hotel, delete hotel by Id