// create admin, login

const adminModel = require('../model/adminModel');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")



const createAdmin = async (req, res) => {
    const data = req.body
    const { email, password } = data

    if (!email && !password) return res.status(422).json({ message: "Invalid Inputs" });

    let existingAdmin = await adminModel.findOne({ email });

    if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    let admin = new adminModel({ email, password: hashedPassword });
    admin = await admin.save();

    if (!admin) return res.status(500).json({ message: "Unable to store admin" });

    return res.status(201).json({ admin });
};



const loginAdmin = async (req, res) => {
    let data = req.body
    let { email, password } = data
    if (!email && !password) return res.status(400).send({ status: false, message: "email or password not present" })

    let isEmailPresent = await adminModel.findOne({ email })
    if (!isEmailPresent) return res.status(404).send({ status: false, message: "Email not exist" })

    let isPasswordPresent = bcrypt.compare(password, isEmailPresent.password)
    if (!isPasswordPresent) return res.status(404).send({ status: false, message: "Password not correct" })

    let token = jwt.sign({ id: isEmailPresent._id }, "isEmailPresentmodel")
    return res
        .status(200)
        .json({ message: "Authentication Complete", token, id: isEmailPresent._id });

}




module.exports = { createAdmin, loginAdmin }