//create user,login user, get all user, get user by id, delete user, update user

const jwt =require('jsonwebtoken')

const  userModel = require('../model/userModel')
const {validString, isValidObjectId, isValidRequestBody, validEmail ,validPassword, validPhone, validNumber} = require("../validator/validator");

//====================== create user ========================

const userCreation = async function (req, res) {

    try {
        let data = req.body
        let { name, email, password, age, phoneNumber, gender } = data
        if(!isValidRequestBody(data)) 
        return res.status(400).send({status:false,message:"Request body is empty"});
        if(!name){
            return res.status(400).send({ status: false, message: "Name is required" })
        }
        if (!validString(name)) {
            return res.status(400).send({ status: false, message: "Name is not valid" })
        }

        if (!validEmail(email)) {
            return res.status(400).send({ status: false, message: "Email is not valid" })
        }
        if(!email){
            return res.status(400).send({ status: false, message: "Email is required" })
        }
        
        if (!validPassword(password)) {
            return res.status(400).send({ status: false, message: "password isnot valid" })
        }
        if (!password) {
            return res.status(400).send({ status: false, message: "password is required" })
        }
        if (!age) {
            return res.status(400).send({ status: false, message: "Age is required" })
        }

        if (!validNumber(age)) {
            return res.status(400).send({ status: false, message: "Age is not valid" })
        }

        if (!phoneNumber) {
            return res.status(400).send({ status: false, message: "phoneNumber is required" })
        }
        if (!validPhone(phoneNumber)) {
            return res.status(400).send({ status: false, message: "phoneNumber is not valid" })
        }
        if (!gender) {
            return res.status(400).send({ status: false, message: "Gender is required" })
        }

        const createdUser = await userModel.create(data)

        return res.status(201).send({ status: true, message: "User is successfully created", data: createdUser })
    }
    catch (error) {
        return res.status(500).send({ status: false, error: error.message });
    }
}


//==================== user login =======================================

const userLogin = async function (req, res) {
    try {

        let requestBody = req.body
        let { email, password } = requestBody

        if (!email) {
            return res.status(400).send({ status: false, msg: " email can't be Empty" })
        }
        if (!validEmail(email)) {
            return res.status(400).send({ status: false, msg: "Enter valid email" })
        }

        if (!password) {
            return res.status(400).send({ status: false, msg: "password can't be Empty" })
        }
        if (!validPassword(password)) {
            return res.status(400).send({ status: false, msg: "Enter valid password" })
        }

        if (email && password) {
            const user = await userModel.findOne({ email: email, password: password })
            if (user) {
                const token = jwt.sign({ user: user._id }, "booking-hotel")
                return res.status(200).send({ status: true, token: token })
            }
            else {
                return res.status(401).send({ status: false, msg: "invalid credentials" })
            }
        }

    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }

}



//======================== get all user =========================================
const getUser = async function (req, res) {
    try {

        let getData = await userModel.find()
        if (getData.length <= 0) {
            return res.status(404).send({ status: false, message: "No user found" })
        }
        return res.status(200).send({ status: true, Data: getData })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}



//=========================== get user by id ==================================
const getUserById = async function (req, res) {
    try {
      const userId = req.params.userId;
      if (!userId) return res.status(400).send({ status: false, message: " Invalid userId" });
    
      if(!isValidObjectId(userId)){
             return res.status(400).send({status:false,message:"UserId is not valid"})
      }
      const userProfile = await userModel.findById(userId);
      if (!userProfile) return res.status(404).send({ status: false, message: "User Profile Not Found" });
  
      return res.status(200).send({status: true,message: "User profile details",data: userProfile,});
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  };

//==========================update user=====================================

const updateUser = async function(req, res) {
    try {
        let data = req.body
        let { name,email,password,age,phoneNumber,gender} = data
        const userId = req.params.userId

        let isUser = await userModel.findById(userId)

        if (!isUser) return res.status(404).send({ status: false, message: "UserId does not exist" })

        if (!isValidObjectId(userId)) {
        return res.status(400).send({ status: false, message: "UserId not valid" })
    }
        
        if (!validString(name)) {
            return res.status(400).send({ status: false, message: "Name is not valid" })
        }

        if (!validEmail(email)) {
            return res.status(400).send({ status: false, message: "Email is not valid" })
        }
        
        if (!validPassword(password)) {
            return res.status(400).send({ status: false, message: "password isnot valid" })
        }
        
        if (!validNumber(age)) {
            return res.status(400).send({ status: false, message: "Age is not valid" })
        }
        if (!validPhone(phoneNumber)) {
            return res.status(400).send({ status: false, message: "phoneNumber is not valid" })
        }
        if (!gender) {
            return res.status(400).send({ status: false, message: "Gender is required" })
        }


        let updatedData = await findByIdAndUpdate({ _id: userId }, { $set: {data: data } }, { new: true })
        return res.status(201).send({ status: true, message: "User Update Seccessfully", updatedData : updatedData  })


    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
      }
}

//======================== delete user ================================

const deleteUser = async function(req,res){
    try {
        let {userId}=req.body
        if(!userId){
        return res.status(400).send({status:false,message:"Pls provide userId"})
        }
        if(!isValidObjectId(userId)){
            return res.status(400).send({status:false,message:"UserId is not valid"})
     }
        let userExists = await userModel.findOne({userId})
        if(!userExists){
            return res.status(404).send({status:false,message:"No user found"})
        }
        await userModel.deleteOne({userId})
        return res.status(200).send({status:true})
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { userCreation ,userLogin,getUser,getUserById,updateUser,deleteUser}
