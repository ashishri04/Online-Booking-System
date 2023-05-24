const express = require("express")
const router = express.Router()
const hotelController = require("../controllers/hotel-controller")

router.post("/hotel", hotelController.createHotel)
router.get("/getAllHotel", hotelController.getAllHotel)
router.get("/getHotelById/:hotelId", hotelController.getHotelById)
router.put("/updateHotel/:hotelId", hotelController.updateHotel)
router.delete("/deleteHotel/:hotelId", hotelController.deleteHotel)


module.exports = router