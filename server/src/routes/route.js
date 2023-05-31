const express = require("express")
const router = express.Router()
const bookingController = require('../controllers/booking-controller')
const hotelController = require("../controllers/hotel-controller")
const userController = require('../controllers/user-controller')
const adminController = require("../controllers/admin-controller")



//--------------------Admin--------------------------------------
router.post("/createAdmin", adminController.createAdmin)
router.post("/loginAdmin", adminController.loginAdmin)


//=================user ============================
router.post("/createUser", userController.userCreation)
router.post("/loginUser", userController.userLogin)
router.get("/getallUser", userController.getUser)
router.get("/getUser/:userId", userController.getUserById)
router.put("/updateUser/:userId", userController.updateUser)
router.delete("/deleteUser/:userId", userController.deleteUser)


//--------------------hotel--------------------------------------
router.post("/hotel", hotelController.createHotel)
router.get("/getAllHotel", hotelController.getAllHotel)
router.get("/getHotelById/:hotelId", hotelController.getHotelById)
router.put("/updateHotel/:hotelId", hotelController.updateHotel)
router.delete("/deleteHotel/:hotelId", hotelController.deleteHotel)


//--------------------bookings----------------------------------
router.post('/booking', bookingController.createBooking);
router.get('/getAllBookings', bookingController.getAllBookings);
router.get('/getBookingsById/:id', bookingController.getBookingById);
router.put('/updateBookings/:bookingId', bookingController.updateBooking);
router.delete('/deleteBooking/:id', bookingController.deleteBooking)



module.exports = router