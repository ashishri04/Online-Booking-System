import { AppBar, Autocomplete, Box, IconButton, Tab, Tabs, TextField, Toolbar } from '@mui/material'
import React, { useState, useEffect } from 'react'
import MovieIcon from '@mui/icons-material/Movie';
import { Link } from 'react-router-dom';
import { getAllHotels } from '../api-helpers/api-helpers';
import { useDispatch, useSelector } from 'react-redux';
import { adminActions, userActions } from '../store';


const Header = () => {

    const dispath = useDispatch()

    const [hotels, setHotels] = useState([])

    const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn)
    const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn)

    useEffect(() => {
        getAllHotels()
            .then((data) => setHotels(data.hotels))
            .catch((error) => console.log(error))
    }, [])


    const logout = (isAdmin) => {
        dispath(isAdmin ? adminActions.logout() : userActions.logout())
    }


    return (
        <AppBar position="sticky" sx={{ background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(121,9,11,1) 35%, rgba(0,212,255,1) 100%)" }}>
            <Toolbar>

                <Box sx={{ bgcolor: "white", borderRadius: "100px" }}>
                    <IconButton LinkComponent={Link} to="/"> <MovieIcon /> </IconButton>
                </Box>

                <Box width={"30%"} margin={"auto"}>
                    <Autocomplete
                        freeSolo
                        options={hotels && hotels.map((option) => option.hotelName)}
                        renderInput={(params) => <TextField sx={{ input: { color: "white" } }} variant="standard" {...params} placeholder="Search Across Multiple Movies" />}
                    />
                </Box>


                <Box display="flex">
                    <Tabs>
                        {!isUserLoggedIn  && !isAdminLoggedIn && <> <Tab LinkComponent={Link} to="/hotels" label="Hotels" />
                            <Tab LinkComponent={Link} to="/auth" label="Auth" />
                            <Tab LinkComponent={Link} to="/admin" label="Admin" />
                        </>}

                        {isUserLoggedIn && (<>
                            <Tab LinkComponent={Link} to="/user-profile" label="Profile" />
                            <Tab onClick={() => logout(false)} LinkComponent={Link} to="/" label="Logout" />
                        </>)}

                        {isAdminLoggedIn && (<>
                            <Tab LinkComponent={Link} to="/admin-profile" label="Profile" />
                            <Tab onClick={() => logout(true)} LinkComponent={Link} to="/" label="Logout" />
                        </>)}
                    </Tabs>
                </Box>

            </Toolbar>
        </AppBar>
    )
}

export default Header