// create booking, get all booking, get booking by id, update booking by id, delete booking by booking id and user id
const bookingModel = require('../model/bookingModel');
const userModel = require("../model/userModel");
const hotelModel = require("../model/hotelModel")
const mongoose = require("mongoose");
const { isValidObjectId, isValidRequestBody, validNumber } = require("../validator/validator");


const createBooking = async (req, res) => {
    try {
        const data = req.body
        const { hotelId, phone, idProof, roomNumber, price, checkIn, checkOut, userId } = data;

        if (!isValidRequestBody(data)) return res.status(400).send({ status: false, message: "Body cannot be empty" })

        if (!(hotelId && phone && idProof && idProof && roomNumber && price && checkIn && checkOut && userId)) return res.status(400).send({ status: false, message: "All field is mandatory" })

        if (!mongoose.Types.ObjectId.isValid(hotelId)) return res.status(404).json({ message: "Hotel Id not valid" })
        if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).json({ message: "User Id not valid" })

        let isHotelPresent = await hotelModel.findById(hotelId)
        let isUserPresent = await userModel.findById(userId)

        if (!isHotelPresent) return res.status(404).send({ staus: false, message: "Hotel ID not exist" })
        if (!isUserPresent) return res.status(404).send({ staus: false, message: "User ID not exist" })

        let booking = await bookingModel.create(data)

        if (idProof !== "adharCard" && idProof !== "votingCard" && idProof !== "pancardCard" && idProof !== "Other") return res.status(400).send({ status: false, message: "IdProof is invalid" });

        if (!validNumber(roomNumber)) return res.status(400).send({ status: false, message: "Room number is invalid" });

        if (!validNumber(price)) return res.status(400).send({ status: false, message: "Price is invalid" });

        if (!checkIn) return res.status(400).send({ status: false, message: "Please provide valide check in date" });

        if (!checkOut) return res.status(400).send({ status: false, message: "Please provide valide check out date" });

        const session = await mongoose.startSession();
        session.startTransaction();
        isUserPresent.bookings.push(booking);
        isHotelPresent.bookingId.push(booking);
        await isUserPresent.save({ session });
        await isHotelPresent.save({ session });
        await booking.save({ session });
        session.commitTransaction();

        return res.status(201).send({ status: true, message: "Booking create successfullt", booking })

    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
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
        let { phone, idProof, roomNumber, price } = data
        let bookingId = req.params.bookingId;

        let isBookingPresent = await bookingModel.findById(bookingId)

        if (!isBookingPresent) return res.status(404).send({ status: false, message: "Booking Id not exist" })

        if (!mongoose.isValidObjectId(bookingId)) return res.status(400).send({ status: false, message: "Booking Id not valid" })

        let newData = await bookingModel.findByIdAndUpdate({ _id: bookingId }, { $set: { phone, idProof, roomNumber, price } }, { new: true })
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

        let findbooking = await bookingModel.findByIdAndDelete({ _id: bookingId });

        return res.status(200).send({ status: true, message: "Booking is cancelled successfully" });

    } catch (error) {
        return res.status(500).send({ status: false, error: error.message });
    }
}

module.exports = { createBooking, getAllBookings, getBookingById, updateBooking, deleteBooking };