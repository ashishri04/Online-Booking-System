const express = require("express")
const router = express.Router()
const{createBooking, getAllBookings, getBookingById, updateBooking, deleteBooking}=require('../controllers/booking-controller')
//const hotelController = require("../controllers/hotel-controller") 

//--------------------bookings----------------------------------
router.post('/booking',createBooking);
router.get('/getAllBookings', getAllBookings);
router.get('/getBookingsById/:id', getBookingById);
router.put('/updateBookings/:id', updateBooking);
router.delete('/deleteBooking/:id',deleteBooking)

//--------------------hotel--------------------------------------
const hotelController = require("../controllers/hotel-controller")
const userController = require('../controllers/user-controller')

//=================user ============================

router.post("/createUser", userController.userCreation)
router.post("/loginUser", userController.userLogin)
router.get("/getallUser", userController.getUser)
router.get("/getUser/:userId", userController.getUserById)
router.put("/updateUser", userController.updateUser)
router.delete("/deleteUser", userController.deleteUser)


//================hotel ===============================
router.post("/hotel", hotelController.createHotel)
router.get("/getAllHotel", hotelController.getAllHotel)
router.get("/getHotelById/:hotelId", hotelController.getHotelById)
router.put("/updateHotel/:hotelId", hotelController.updateHotel)
router.delete("/deleteHotel/:hotelId", hotelController.deleteHotel)


module.exports = router