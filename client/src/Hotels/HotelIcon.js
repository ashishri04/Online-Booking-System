import { Button, CardActions, Typography, CardContent, Card } from '@mui/material'
import React from 'react'

const HotelIcon = ({ hotelName, imageUrl, room_type, id }) => {
    return (
        <Card sx={{ margin: 2, width: 250, height: 320, borderRadius: 5, ":hover": { boxShadow: "10px 10px 20px #ccc" } }}>

            <img height={"50%"} width="100%" src={imageUrl} alt={hotelName} />

            <CardContent>
                <Typography gutterBottom variant="h5" component="div">{hotelName}</Typography>
                <Typography variant="body2" color="text.secondary">{room_type}</Typography>
            </CardContent>

            <CardActions>
                <Button size="small" color="primary">Share</Button>
            </CardActions>
        </Card>
    )
}

export default HotelIcon