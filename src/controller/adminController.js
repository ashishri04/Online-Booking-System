const adminModel=require('../model/adminModel');

const createAdmin= async (req, res){
    try{
      let data=req.body;
      let {name, email, password}=data;
    if(!name){
        return res.status(400).send({status:false, message:"Enter Your name"})
    }
    if(!email){
        return res.status(400).send({status:false, message:"Enter Your email"});
    }

    const findEmail= await adminModel.findOne({email:email})
    if(findEmail){return res.status(400).send({status:false,message:`${email} already exist`})}
    if(!password){
        return res.status(400).send({status:false, message:"Enter the password"});
    }

    const createInfo= await adminModel.create(data)

    return response.status(201).send({status:true, message:"Admin information is successfully created", data:createInfo})

    }catch(error){
       return res.status(500).send({status:false,  error: error.message);
    }
}