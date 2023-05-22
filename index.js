const express= require('express');
const mongoose=require('mongoose');

const route=require('./src/routes/route');
const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://Aman_Mohadikar:V5FW1Y8X6b2pIiud@cluster0.gdww84s.mongodb.net/hotel-booking-system',
{useNewUrlParser:true
})

.then(()=>console.log("Mongoose is connected"))
.catch((error)=>console.log(error));

app.use("/",route)

app.listen(process.env.PORT || 3000, function(){
    console.log("express is app is running on port"+(process.env.PORT ||3000))
})