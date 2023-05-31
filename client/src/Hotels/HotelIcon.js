import { Button, CardActions, Typography, CardContent, Card } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const HotelIcon = ({ hotelName, imageUrl, hotelId }) => {
    return (
        <Card sx={{ margin: 2, width: 250, height: 320, borderRadius: 5, ":hover": { boxShadow: "10px 10px 20px #ccc" } }}>

            <img height={"50%"} width="100%" src={imageUrl} alt={hotelName} />

            <CardContent>
                <Typography gutterBottom variant="h5" component="div">{hotelName}</Typography>
            </CardContent>

            <CardActions>
            <Button variant='contained' fullWidth LinkComponent={Link} to={`/booking/${hotelId}`} sx={{ margin: "auto" }} size="small">Book</Button>
            </CardActions>
        </Card>
    )
}

export default HotelIcon