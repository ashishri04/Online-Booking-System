import axios from "axios"


export const getAllHotels = async () => {
    const res = await axios.get("http://localhost:5000/getAllHotel")
        .catch((error) => console.log(error))
    if (res.status !== 200) {
        console.log("No data found")
    }
    const data = await res.data
    return data
}


export const userLogin = async (data, signup) => {
    const res = await axios.post(`http://localhost:5000/${signup ? "createUser" : "loginUser"}`, {
        name: signup ? data.name : "", age: signup ? data.age : "", gender: signup ? data.gender : "",
        phoneNumber: signup ? data.phoneNumber : "", email: data.email, password: data.password
    })
        .catch((err) => console.log(err))

    if (res.status !== 200 && res.status !== 201) {
        console.log("Unexpected Error occured")
    }

    const resData = await res.data
    return resData
}


export const adminLogin = async (data) => {
    const res = await axios.post
        (`http://localhost:5000/loginAdmin`, {
            email: data.email, password: data.email
        })
        .catch((err) => console.log(err))


    if (res.status !== 201 && res.status !== 200) {
        console.log("status code not matct")
    }

    const resData = await res.data
    return resData
}

export const getHotelDetails = async(hotelId) => {
    const res = await axios.get(`http://localhost:5000/getHotelById/${hotelId}`)
    .catch((error) => console.log(error))

    if(res.status !== 200){
        console.log("error occured")
    }
    const resData = await res.data
    return resData
}


export const addHotel = async(data) => {
    const res = await axios.post(`http://localhost:5000/loginAdmin`,{
        hotelId : data.hotelId, phone : data.phone, idProof : data.idProof, 
        roomNumber : data.roomNumber, price : data.price, checkIn : data.checkIn, 
        checkOut : data.checkOut, userId : data.userId
    })
    .catch((error) => console.log(error))

    if(res.status !== 201){
        console.log("error occured")
    }

    const resData = res.data
    return resData
}