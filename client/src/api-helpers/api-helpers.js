import axios from "axios"

export const getAllHotels = async () => {
        const res = await axios.get("http://localhost:5000/getAllHotel")
        .catch((error) => console.log(error))
        if(res.status !== 200){
            console.log("No data found")
        }
        const data = await res.data
        return data
}