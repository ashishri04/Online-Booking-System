import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAllHotels } from '../api-helpers/api-helpers'
import HotelIcon from '../Hotels/HotelIcon'
import { Link } from 'react-router-dom'

const HomePage = () => {

    const [hotels, setHotels] = useState([])

    useEffect(() => {
        getAllHotels()
            .then((data) => setHotels(data.hotels))
            .catch((error) => console.log(error))
    }, [])

    return (
        <Box height={"100%"} width={"100%"} marginTop={"2px"} margin={"auto"}>

            <Box margin={"auto"} width="80%" height={"40vh"} padding={2}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkKfpiaPf5Wp0AvpFd8rrsZMCkDCLDRVeMZQ&usqp=CAU" alt="Hotel" width={"100%"} height={"100%"} />
            </Box>

            <Box padding={5} margin="auto">
                <Typography variant="h4" textAlign={"center"} sx={{ marginBottom: 6 }}>Latest Hotels</Typography>
            </Box>

            <Box margin={"auto"} display="flex" width="80%" justifyContent={"center"} alignItems="center" flexWrap="wrap">
                {hotels && hotels.slice(0, 4).map((hotel, index) => (
                    <HotelIcon id={hotel.id} hotelName={hotel.hotelName} imageUrl={hotel.imageUrl} key={index} />
                ))}
            </Box>

            <Box display="flex" padding={5} margin="auto">
                <Button LinkComponent={Link} to="/hotels" variant="outlined" sx={{ margin: "auto", color: "#2b2d42" }}>View All Hotels</Button>
            </Box>

        </Box>
    )
}

export default HomePage