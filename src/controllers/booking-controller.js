// create booking, get all booking, get booking by id, update booking by id, delete booking by booking id and user id
const bookingModel= require('../model/bookingModel');
const userModel= require("../model/userModel");
const mongoose=require("mongoose");
const {validString, isValidObjectId, isValidRequestBody,  validPhone, validNumber}=require("../validator/validator");


const createBooking = async (req, res) => {
    try {
        let data = req.body;
        let { hotelName, phone, idProof, roomNumber, price, checkIn, checkOut, userId } = data;
        if (!isValidRequestBody(data)) return res.status(400).send({ status: false, message: "Request body is empty" });

        if (!isValidRequestBody(userId)) return res.status(404).send({ status: false, message: "User Id is missing" });
        if (!isValidObjectId(userId)) return res.status(400).send({ status: false, message: "Price is invalid" });

const findUser= await userModel.findById({userId:_id})
if(!findUser) return res.status(404).send({status:false, message:"User not fount"});

        if (!isValidRequestBody(hotelName)) return res.status(404).send({ status: false, message: "Please provide Hotel name" });
        if (!validString(hotelName)) return res.status(404).send({ status: false, message: "Hotel name is invalid" });

        if (!isValidRequestBody(phone)) return res.status(404).send({ status: false, message: "Please provide phone number" });
        if (!validPhone(phone)) return res.status(400).send({ status: false, message: "Phone number is invalid" });

        if (!isValidRequestBody(idProof)) return res.status(404).send({ status: false, message: "Please provide idProof" });
        if (!validString(idProof)) return res.status(400).send({ status: false, message: "idProof is invalid" });

if(!isValidRequestBody(roomNumber)) return res.status(404).send({ status: false, message: "Please provide room number" });
if(!validNumber(roomNumber)) return res.status(400).send({status:false, message:"Room number is invalid"});

if(!isValidRequestBody(price)) return res.status(404).send({ status: false, message: "Please provide price" });
if(!validNumber(price)) return res.status(400).send({status:false,message:"Price is invalid"});

        if (!isValidRequestBody(checkIn)) return res.status(404).send({ status: false, message: "Please provide checkIn time" });

        if (!isValidRequestBody(checkOut)) return res.status(404).send({ status: false, message: "Please provide checkOut time" });

        const createBookings = await bookingModel.create(data);

        return res.status(201).send({ status: true, messsage: "Booking is successfully done", data: createBookings });

    } catch (error) {
        return res.status(500).send({ status: false, error: error.message });
    }
}

const getAllBookings = async (req, res) => {
    try {
        const findBookings = await bookingModel.find().populate("User");
        if (!findBookings) return res.status(404).send({ status: false, message: "No booking found" });

        return res.status(200).send({ status: true, findBookings })
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message });
    }
}

const getBookingById = async (req, res) => {
    try {
        const bookingId = req.params._id;
        const findBookingById = await bookingModel.findById(bookingId);
        if (!findBookingById) return res.status(404).send({ status: false, message: "Booking does not exist" });
        return res.status(200).send({ status: true, findBookingById })
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}

const updateBooking = async (req, res) => {
    try {
        let data = req.body;
        let { phone, idProof, roomNumber, price, checkIn, checkOut } = data;


        if (!isValidRequestBody(phone)) return res.status(404).send({ status: false, message: "Please provide phone number" });
        if (!validPhone(phone)) return res.status(400).send({ status: false, message: "Phone number is invalid" });

        if (!isValidRequestBody(idProof)) return res.status(404).send({ status: false, message: "Please provide idProof" });
        if (!validString(idProof)) return res.status(400).send({ status: false, message: "idProof is invalid" });

        if (!isValidRequestBody(roomNumber)) return res.status(404).send({ status: false, message: "Please provide room number" });
        if (!validNumber(roomNumber)) return res.status(400).send({ status: false, message: "Room number is invalid" });

        if (!isValidRequestBody(price)) return res.status(404).send({ status: false, message: "Please provide price" });
        if (!validNumber(price)) return res.status(400).send({ status: false, message: "Price is invalid" });


        if (!isValidRequestBody(checkIn)) return res.status(404).send({ status: false, message: "Please provide checkIn time" });


        if (!isValidRequestBody(checkOut)) return res.status(404).send({ status: false, message: "Please provide checkOut time" });


        let bookingId = req.params._id;

        let findbooking = await bookingModel.findByIdAndUpdate(bookingId, {
            phone,
            idProof,
            roomNumber,
            price,
            checkIn,
            checkOut
        });
        if (findbooking) return res.status(404).send({ status: false, message: "Booking not found" });

        return res.status(200).send({ status: true, findbooking });
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message });
    }
}

const deleteBooking = async (req, res) => {
    try {
        let bookingId = req.params._id;
        let findbooking = await bookingModel.findByIdAndDelete(bookingId);
        if (findbooking) return res.status(404).send({ status: false, message: "Booking not found" });

        return res.status(200).send({ status: true, message: "Booking is cancelled successfully", findbooking });

    } catch (error) {
        return res.status(500).send({ status: false, error: error.message });
    }
}

module.exports = { createBooking, getAllBookings, getBookingById, updateBooking, deleteBooking };