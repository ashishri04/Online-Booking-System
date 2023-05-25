// create admin, login

const adminModel = require('../model/adminModel');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const createAdmin = async (req, res) => {
    try {
        let data = req.body;
        let { name, email, password } = data;
        if (!name) {
            return res.status(400).send({ status: false, message: "Enter Your name" })
        }
        if (!email) {
            return res.status(400).send({ status: false, message: "Enter Your email" });
        }

        const findEmail = await adminModel.findOne({ email: email })
        if (findEmail) { return res.status(400).send({ status: false, message: `${email} already exist` }) }
        if (!password) {
            return res.status(400).send({ status: false, message: "Enter the password" });
        }

        data.password = await bcrypt.hash(password, 10)

        const createInfo = await adminModel.create(data)

        return res.status(201).send({ status: true, message: "Admin information is successfully created", data: createInfo })

    } catch (error) {
        return res.status(500).send({ status: false, error: error.message });
    }
}



const loginAdmin = async (req, res) => {
        let data = req.body
        let { email, password } = data
        if (!email && !password) return res.status(400).send({ status: false, message: "email or password not present" })

        let isEmailPresent = await adminModel.findOne({email})
        if (!isEmailPresent) return res.status(404).send({ status: false, message: "Email not exist" })

        let isPasswordPresent = await bcrypt.compare(password, isEmailPresent.password)
        if (!isPasswordPresent) return res.status(404).send({ status: false, message: "Password not correct" })

        let token = jwt.sign({ isEmailPresent: isEmailPresent._id }, "isEmailPresentmodel")
        return res.status(200).send({ status: true, message: "Login Sunccessfully", token: token })
   
}



module.exports = { createAdmin, loginAdmin }