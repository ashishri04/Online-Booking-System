import { Box, Button, FormLabel, TextField, Typography } from '@mui/material'
import React, { useState, useEffect, Fragment } from 'react'
import { addHotel, getHotelDetails } from '../api-helpers/api-helpers'
import { useNavigate, useParams } from 'react-router-dom'

const Booking = () => {

  const navigate = useNavigate()
  const id = useParams().id
  console.log(id)

  const [input, setInput] = useState({
    phone: "", idProof: "", roomNumber: "", price: "", checkIn: "", checkOut: "",
  })

  const [hotel, setHotel] = useState()

  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  useEffect(() => {
    getHotelDetails(id)
      .then((res) => setHotel(res.hotel))
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    alert("Book Successfully")
    addHotel({ ...input, hotel: hotel._id })
      .then((data) => console.log(data))
      .then(() => navigate("/"))
      .catch((error) => console.log(error))
  }


  return (
    <div>
      {hotel && (
        <Fragment>
          <Typography padding={3} fontFamily="fantasy" variant="h4" textAlign={"center"}>Book TIckets Of hotel: {hotel.hotelName}</Typography>

          <Box display={"flex"} justifyContent={"center"}>
            <Box display={"flex"} justifyContent={"column"} flexDirection="column" paddingTop={3} mwidth="50%" marginRight={"auto"}>

              <img width="80%" height={"300px"} src={hotel.posterUrl} alt={hotel.hotelName} />

              <Box width={"80%"} marginTop={3} padding={2}>

                <Typography paddingTop={2}>{hotel.description}</Typography>

                <Typography fontWeight={"bold"} marginTop={1}>Starrer:{hotel.roomNumber.map((roomNumber) => " " + roomNumber + " ")}</Typography>

                <Typography fontWeight={"bold"} marginTop={1}>Release Date: {new Date(hotel.releaseDate).toDateString()}</Typography>

              </Box>

            </Box>


            <Box width={"50%"} paddingTop={3}>

              <form onSubmit={handleSubmit}>

                <Box padding={5} margin={"auto"} display="flex" flexDirection={"column"}>

                  <FormLabel>Phone</FormLabel>
                  <TextField name="phone" value={input.phone} onChange={handleChange} type={"number"} margin="normal" variant="standard" />

                  <FormLabel>IdProof</FormLabel>
                  <TextField name="idProof" type={"text"} margin="normal" variant="standard" value={input.idProof} onChange={handleChange} />

                  <FormLabel>Room No : </FormLabel>
                  <TextField name="roomNumber" type={"number"} margin="normal" variant="standard" value={input.price} onChange={handleChange} />

                  <FormLabel>Price</FormLabel>
                  <TextField name="price" type={"text"} margin="normal" variant="standard" value={input.idProof} onChange={handleChange} />

                  <FormLabel>CheckIn</FormLabel>
                  <TextField name="checkIn" type={"text"} margin="normal" variant="standard" value={input.checkIn} onChange={handleChange} />

                  <FormLabel>CheckOut</FormLabel>
                  <TextField name="checkOut" type={"text"} margin="normal" variant="standard" value={input.checkOut} onChange={handleChange} />

                  <Button type="submit" sx={{ mt: 3 }}>Book Now</Button>

                  </Box>
                            </form>
                        </Box>
                    </Box>
                </Fragment>
            )}
        </div>
    );
};

export default Booking