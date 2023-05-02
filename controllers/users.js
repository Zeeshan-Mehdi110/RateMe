const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { createJWTToken } = require("../utills/util");
const { varifyUser } = require("../middlewares/user_auth");
const router = express.Router()

// router.use(["/add","/edit","/delete","/profile","/profile-update"],varifyUser)

router.post("/add",async (req,res)=> {
  const userExist = await User.findOne({email : req.body.email})
try {
  if(userExist) throw new Error("This email is already registered")
  const { name ,email,phone_number,profile_picture,password,type,created_on,modified_on } = req.body
  const user = new User({
    name : name,
    email : email,
    phone_number,
    profile_picture,
    password : await bcrypt.hash(password , 10),
    type,
    created_on :created_on,
    modified_on : modified_on
  }) 
  await user.save();

  delete user.password
  res.json({user})
} catch (error) {
  res.status(400).json({error : error.message})
}
})

router.post("/edit",async (req,res)=> {
  console.log(req.user)
  const userExist = await User.findOne({email : req.body.email , _id : { $ne : req.body.id } })
try {
  if(userExist) throw new Error("This email is already registered")

  if(!req.body.id) throw new Error("User id is required")
  if(!mongoose.isValidObjectId(req.body.id)) throw new Error("user id is invalid")
  if(req.user._id.toString() !== req.body.id ) throw new Error("invalid request")

  const user = await User.findById(req.body.id)
  if(!user) throw new Error("User does not exists")

  const { name ,email,phone_number,profile_picture,password,type,created_on } = req.body
  let updatedUser =  await  User.findByIdAndUpdate(req.body.id ,{
    name : name,
    email : email,
    phone_number,
    profile_picture,
    password : await bcrypt.hash(password , 10),
    type,
    created_on :created_on,
  }) 
  await user.save();

  delete user.password
  res.json({user : updatedUser})
} catch (error) {
  res.status(400).json({error : error.message})
}
})

router.delete("/delete",async (req,res) => {
  console.log(req.body.id)
  try {
    if(!req.body.id) throw new Error("User id is required")
    if(!mongoose.isValidObjectId(req.body.id)) throw new Error("user id is invalid")
  
    const user = await User.findById(req.body.id)
    if(!user) throw new Error("User does not exists")
    
    await User.findOneAndDelete(req.body.id)
    res.json({success : true})
  } catch (error) {
    res.status(400).json({error : error.message})
  }

})

router.get("/profile",async (req,res) => {
  try {
    let user = await User.findById(req.user._id)
    user = user.toObject()
    delete user.password
    res.json({user})
  } catch (error) {
    res.status(400).json({ error : error.message })
  }
})

router.post("/profile-update",async (req,res)=> {
  console.log(req.user)
  const userExist = await User.findOne({email : req.body.email , _id : { $ne : req.user._id } })
try {
  if(userExist) throw new Error("This email is already registered")

  const { name ,email,phone_number,profile_picture,password,type,active,created_on,modified_on } = req.body
  let updatedUser =  await  User.findByIdAndUpdate(req.user._id ,{
    name : name,
    email : email,
    phone_number,
    profile_picture,
    password : await bcrypt.hash(password , 10),
    type,
    active,
    created_on :created_on,
  }) 
  await updatedUser.save();
  updatedUser = updatedUser.toObject()
  delete updatedUser.password
  res.json({user : updatedUser})
} catch (error) {
  res.status(400).json({error : error.message})
}
})

router.post("/signin",async (req,res) => {
  try {
    if(!req.body.email) throw new Error("Email is required");
    if(!req.body.password) throw new Error("password is required")
    let user = await User.findOne({email : req.body.email})
    if(!user) throw new Error("Email or password is incorrect")
    if(!(await bcrypt.compare(req.body.password , user.password)))
      throw new Error('Email or password is incorrect')
      
      user = user.toObject()
      delete user.password

      const token = await createJWTToken(user,6)
      res.json({user,token})

  } catch (error) {
    res.status(400).json({error : error.message})
  }
})

router.get("/",async (req,res) => {
  try {
    const users = await User.find()
    res.json({users})
  } catch (error) {
    res.status(400).json({ error : error.message })
  }
})

module.exports = router