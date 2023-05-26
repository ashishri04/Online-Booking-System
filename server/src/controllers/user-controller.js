//create user,login user, get all user, get user by id, delete user, update user

const jwt = require('jsonwebtoken')
const userModel = require('../model/userModel')
const bcrypt = require("bcrypt")
const { validString, isValidObjectId, isValidRequestBody, validEmail, validPassword, validPhone, validNumber } = require("../validator/validator");


//====================== create user ========================

const userCreation = async function (req, res) {

    try {
        let data = req.body
        let { name, email, password, age, phoneNumber, gender } = data

        if (!isValidRequestBody(data)) return res.status(400).send({ status: false, message: "Request body is empty" });

        if (!name) return res.status(400).send({ status: false, message: "Name is required" })
        if (!validString(name)) return res.status(400).send({ status: false, message: "Name is not valid" })

        if (!validEmail(email)) return res.status(400).send({ status: false, message: "Email is not valid" })
        if (!email) return res.status(400).send({ status: false, message: "Email is required" })
        let isEmailPresent = await userModel.findOne({ email: email })
        if (isEmailPresent) return res.status(400).send({ status: false, message: "Email is already exist" })

        if (!validPassword(password)) return res.status(400).send({ status: false, message: "password is not valid" })
        if (!password) return res.status(400).send({ status: false, message: "password is required" })
        data.password = await bcrypt.hash(password, 10)

        if (!age) return res.status(400).send({ status: false, message: "Age is required" })
        if (age < 18) return res.status(400).send({ status: false, message: "Age should be 18 or above 18" })

        if (!phoneNumber) return res.status(400).send({ status: false, message: "phoneNumber is required" })
        if (!validPhone(phoneNumber)) return res.status(400).send({ status: false, message: "phoneNumber is not valid" })

        if (!gender) return res.status(400).send({ status: false, message: "Gender is required" })
        if (gender !== "Male" && gender !== "Female" && gender !== "Others") return res.status(400).send({ status: false, message: "Gender must be valid" })

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

        let data = req.body
        let { email, password } = data
        if (!email && !password) return res.status(400).send({ status: false, message: "email or password not present" })

        let isEmailPresent = await userModel.findOne({ email })
        if (!isEmailPresent) return res.status(404).send({ status: false, message: "Email not exist" })

        let isPasswordPresent = await bcrypt.compare(password, isEmailPresent.password)
        if (!isPasswordPresent) return res.status(404).send({ status: false, message: "Password not correct" })

        let token = jwt.sign({ isEmailPresent: isEmailPresent._id }, "isEmailPresentmodel")
        return res.status(200).send({ status: true, message: "Login Sunccessfully", token: token })

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

        if (!isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: "UserId is not valid" })
        }
        const userProfile = await userModel.findById(userId);
        if (!userProfile) return res.status(404).send({ status: false, message: "User Profile Not Found" });

        return res.status(200).send({ status: true, message: "User profile details", data: userProfile, });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

//==========================update user=====================================

const updateUser = async function (req, res) {
    let data = req.body
    let { name, email, password, age, phoneNumber } = data
    const userId = req.params.userId

    if (!isValidObjectId(userId)) return res.status(400).send({ status: false, message: "UserId not valid" })

    let isUser = await userModel.findById(userId)

    if (!isUser) return res.status(404).send({ status: false, message: "UserId does not exist" })


    if (name) {
        if (!validString(name)) return res.status(400).send({ status: false, message: "Name is not valid" })
    }

    if (password) {
        if (!validEmail(email)) {
            return res.status(400).send({ status: false, message: "Email is not valid" })
        }
    }


    if (age) {
        if (!validNumber(age)) {
            return res.status(400).send({ status: false, message: "Age is not valid" })
        }
    }

    if (phoneNumber) {
        if (!validPhone(phoneNumber)) {
            return res.status(400).send({ status: false, message: "phoneNumber is not valid" })
        }
    }


    let updatedData = await userModel.findByIdAndUpdate({ _id: userId }, { $set: data }, { new: true })
    return res.status(201).send({ status: true, message: "User Update Seccessfully", updatedData: updatedData })

}

//======================== delete user ================================

const deleteUser = async function (req, res) {
    try {
        let userId = req.params.userId
        if (!userId) return res.status(400).send({ status: false, message: "Pls provide userId" })

        if (!isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: "UserId is not valid" })
        }
        let userExists = await userModel.findById(userId)
        if (!userExists) return res.status(404).send({ status: false, message: "No user found" })

        await userModel.deleteOne({ userId })
        return res.status(200).send({ status: true })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { userCreation, userLogin, getUser, getUserById, updateUser, deleteUser }
