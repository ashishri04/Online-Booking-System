const express = require("express")
const router = express.Router()
const{createBooking, getAllBookings, getBookingById, updateBooking, deleteBooking}=require('../controllers/booking-controller')
const hotelController = require("../controllers/hotel-controller") 

//--------------------bookings----------------------------------
router.post('/booking',createBooking);
router.get('/getAllBookings', getAllBookings);
router.get('/getBookingsById/:id', getBookingById);
router.put('/updateBookings/:id', updateBooking);
router.delete('/deleteBooking/:id',deleteBooking)

//--------------------hotel--------------------------------------
router.post("/hotel", hotelController.createHotel)
router.get("/getAllHotel", hotelController.getAllHotel)
router.get("/getHotelById/:hotelId", hotelController.getHotelById)
router.put("/updateHotel/:hotelId", hotelController.updateHotel)



module.exports = router