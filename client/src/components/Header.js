import { AppBar, Autocomplete, Box, IconButton, Tab, Tabs, TextField, Toolbar } from '@mui/material'
import React, { useState, useEffect } from 'react'
import MovieIcon from '@mui/icons-material/Movie';
import { Link } from 'react-router-dom';
import { getAllHotels } from '../api-helpers/api-helpers';


const Header = () => {

    const [hotels, setHotels] = useState([])

    useEffect(() => {
        getAllHotels()
            .then((data) => setHotels(data.hotels))
            .catch((error) => console.log(error))
    }, [])

    const handleChange = (e, val) => {
        const hotel = hotels.find((m) => m.title === val);
        console.log(hotel);

    };

    return (
        <AppBar position="sticky" sx={{ background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(121,9,11,1) 35%, rgba(0,212,255,1) 100%)" }}>
            <Toolbar>
                
                <Box sx={{ bgcolor: "white", borderRadius: "100px" }}>
                    <IconButton LinkComponent={Link} to="/"> <MovieIcon /> </IconButton>
                </Box>

                <Box width={"30%"} margin="auto">

                    <Autocomplete onChange={handleChange} freeSolo options={hotels && hotels.map((option) => option.hotelName)}
                        renderInput={(params) => (
                            <TextField sx={{ input: { color: "white" } }} variant="standard" {...params} placeholder="Search Acroos Multiple Movies" />
                        )}
                    />
                </Box>


                <Box display="flex">
                    <Tabs>
                        <Tab LinkComponent={Link} to="/hotels" label="Hotels" />
                        <Tab LinkComponent={Link} to="/auth" label="Auth" />
                        <Tab LinkComponent={Link} to="/admin" label="Auth" />
                    </Tabs>
                </Box>

            </Toolbar>
        </AppBar>
    )
}

export default Header