// create booking, get all booking, get booking by id, update booking by id, delete booking by booking id and user id
const bookingModel= require('../model/bookingModel');
const userModel= require("../model/userModel");
const mongoose=require("mongoose");
const {validString, isValidObjectId, isValidDate, isValidRequestBody,  validPhone, validNumber}=require("../validator/validator");


const createBooking = async (req, res) => {
    try {
        let data = req.body;
        let { hotelName, phone, idProof, roomNumber, price, checkIn, checkOut, userId } = data;
        if (!isValidRequestBody(data)) return res.status(400).send({ status: false, message: "Request body is empty" });

        if (!isValidRequestBody(userId)) return res.status(404).send({ status: false, message: "User Id is missing" });
        if (!isValidObjectId(userId)) return res.status(400).send({ status: false, message: "Price is invalid" });

        const findUser= await userModel.findById({_id:userId})
        if(!findUser) return res.status(404).send({status:false, message:"User not fount"});

        if (!isValidRequestBody(hotelName)) return res.status(400).send({ status: false, message: "Please provide Hotel name" });
        if (!validString(hotelName)) return res.status(404).send({ status: false, message: "Hotel name is invalid" });

        if (!isValidRequestBody(phone)) return res.status(400).send({ status: false, message: "Please provide phone number" });
        if (!validPhone(phone)) return res.status(400).send({ status: false, message: "Phone number is invalid" });

        if (!isValidRequestBody(idProof)) return res.status(400).send({ status: false, message: "Please provide idProof" });
        if (!validString(idProof)) return res.status(400).send({ status: false, message: "idProof is invalid" });

        if(!validNumber(roomNumber)) return res.status(400).send({status:false, message:"Room number is invalid"});

        if(!validNumber(price)) return res.status(400).send({status:false,message:"Price is invalid"});

        if (!isValidRequestBody(checkIn)) return res.status(400).send({ status: false, message: "Please provide check in time" });
        if(!isValidDate(checkIn)) return res.status(400).send({status:false, message:"Please provide valide check in date"});

        if (!isValidRequestBody(checkOut)) return res.status(400).send({ status: false, message: "Please provide check out time" });
        if(!isValidDate(checkOut)) return res.status(400).send({status:false, message:"Please provide valide check out date"});

        const createBookings = await bookingModel.create(data);

        return res.status(201).send({ status: true, messsage: "Booking is successfully done", data: createBookings });

    } catch (error) {
        return res.status(500).send({ status: false, error: error.message });
    }
}

const getAllBookings = async (req, res) => {
    try {
        const findBookings = await bookingModel.find().populate("userId");
        if (!findBookings) return res.status(404).send({ status: false, message: "No booking found" });

        return res.status(200).send({ status: true, findBookings })
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message });
    }
}


const getBookingById = async (req, res) => {
    try {
        const bookingId = req.params.bookingId;
        if (!isValidObjectId(bookingId)) return res.status(400).send({ status: false, message: "booking Id not valid" })

        const findBookingById = await bookingModel.findById(bookingId);
        if (!findBookingById) return res.status(404).send({ status: false, message: "Booking does not exist" });
        return res.status(200).send({ status: true, findBookingById })
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}

const updateBooking = async (req, res) => {

    try {
       let data = req.body
       let {  phone, idProof, roomNumber, price } = data
       let bookingId = req.params.bookingId;

       let isBookingPresent = await bookingModel.findById(bookingId)

       if (!isBookingPresent) return res.status(404).send({ status: false, message: "Booking Id not exist" })

       if (!mongoose.isValidObjectId(bookingId)) return res.status(400).send({ status: false, message: "Booking Id not valid" })

       let newData = await bookingModel.findByIdAndUpdate({ _id: bookingId }, { $set: {phone, idProof, roomNumber, price } }, { new: true })
       return res.status(201).send({ status: true, message: "Booking Update Seccessfully", newData: newData })

   }
   catch (error) {
       return res.status
   }
}

const deleteBooking = async (req, res) => {
    try {
        let bookingId = req.params.bookingId;
        let booking = await bookingModel.findOne({ _id: bookingId })
        if (!booking) return res.status(404).send({ status: false, message: "Booking not found" });

        let findbooking = await bookingModel.findByIdAndDelete({_id:bookingId});

        return res.status(200).send({ status: true, message: "Booking is cancelled successfully" });

    } catch (error) {
        return res.status(500).send({ status: false, error: error.message });
    }
}

module.exports = { createBooking, getAllBookings, getBookingById, updateBooking, deleteBooking };