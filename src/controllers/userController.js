const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken")
const { isValidString, isValidName, isValidPhone, isValidEmail, isValidPassword  } = require("../validators/validation");

//============================ post API for create user ===================================

const createUser = async function (req, res) {
    try {
        let data = req.body;
        let {title , name, phone, email, password, address} = data;
        
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "Body can not empty" })
        }
        if (!isValidString(title)) {
            return res.status(400).send({ status: false, msg: "title can not found" })
        }
       if (!isValidString(name)) {
           return res.status(400).send({ status: false, msg: "Name not found" })
       }
       if(!isValidName(name)) {
           return res.status(400).send({ status: false, msg: "Name is invalid" })
        }
        if (!isValidString(phone)) {
            return res.status(400).send({ status: false, msg: "Phone number not found" })
        }
        if(!isValidPhone(phone)) {
           return res.status(400).send({ status: false, msg: "Phone number is invalid" })
        }
        let phoneExist = await userModel.findOne({phone:phone})
        if(phoneExist){
            return res.status(400).send({status:false, msg: "phone number already exist"})
        }
        if (!isValidString(email)) {
            return res.status(400).send({ status: false, msg: "email not found" })
        }
        if(!isValidEmail(email)) {
            return res.status(400).send({ status: false, msg: "email is invalid" })
        }
        let emailExist = await userModel.findOne({email:email})
        if(emailExist){
            return res.status(400).send({status:false, msg: "email number already exist"})
        }
        if (!isValidString(password)) {
            return res.status(400).send({ status: false, msg: "password not found" })
        }
        if(!isValidPassword(password)) {
            return res.status(400).send({ status: false, msg: "password is invalid" })
        }
        if (!isValidString(address)) {
            return res.status(400).send({ status: false, msg: "address not found" })
        }
        let {street, city, pincode} = address
        if(!isValidString(street)){
            return res.status(400).send({status:false, msg: "invalid street"})
        }
        if(!isValidString(city)){
            return res.status(400).send({status:false, msg: "invalid city"})
        }
        if(!isValidString(pincode)){
            return res.status(400).send({status:false, msg: "invalid pincode"})
        }
        
        let savedData = await userModel.create(data)
        res.status(201).send({ status: true, msg:"new user is created", data: savedData })
    }
    
    catch (error) {
        res.status(500).send({status: false, msg: error.message })
    }
};

//============================ post API for login user ===================================

let loginUser=async function(req,res){
    try{
      let data=req.body
      if(Object.keys(data).length==0) {return res.status(400).send({status:false,message:"data is not present"})}
      email=req.body.email
      password=req.body.password
      
     if(!(email)) {return res.status(400).send({status:false,message:"email is mandatory"})}
  
     if(isValidEmail(email)==false) {return res.status(400).send({status:false,message:"invalid email"})}
  
     if(!(password)) { return res.status(400).send({status:false,message:"password is mandatory"})}
  
     if(isValidPassword(password)==false) { return res.status(400).send({status:false,message:"invalid password"})}
  
      let userPresent=await userModel.findOne({email:email,password:password})
  
      if(!(userPresent)) { return res.status(400).send({status:false,message:"email or password is incorrect"})}
  
      let token=jwt.sign({
          userId:userPresent._id,
          username:userPresent.name,
      
      },"group 38",{expiresIn:"1min"},{iat:Date.now()})
  
      res.setHeader("x-auth-token",token)
      res.status(200).send({status:true,token:token})
  
    }
    catch(err){
      res.status(500).send({status:false,messege:err.message})
    }
  }



module.exports = { createUser, loginUser}
