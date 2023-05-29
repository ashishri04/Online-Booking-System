import React,{useEffect, useState} from 'react'
import HotelIcon from './HotelIcon'
import { Box } from '@mui/material'
import { getAllHotels } from '../api-helpers/api-helpers'

const Hotels = () => {

  const [hotels, setHotels] = useState([])

    useEffect(() => {
        getAllHotels()
            .then((data) => setHotels(data.hotels))
            .catch((error) => console.log(error))
    }, [])


  return (
 
    <Box margin={"auto"} display="flex" width="80%" justifyContent={"center"} alignItems="center" flexWrap="wrap">
    {hotels && hotels.slice(0, 4).map((hotel, index) => (
        <HotelIcon id={hotel.id} hotelName={hotel.hotelName} imageUrl={hotel.imageUrl} key={index} />
    ))}
</Box>
  )
}

export default Hotels