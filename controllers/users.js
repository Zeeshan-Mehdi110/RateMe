const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { createJWTToken } = require("../utills/util");
const router = express.Router()

router.post("/add",async (req,res)=> {
  console.log(req.body)
try {
  const { name ,email,phone_number,profile_picture,password,type,active,created_on,modified_on } = req.body
  const user = new User({
    name : name,
    email : email,
    phone_number,
    profile_picture,
    password : await bcrypt.hash(password , 10),
    type,
    active,
    created_on :created_on,
    modified_on : modified_on
  }) 
  await user.save();
  res.json({user})
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

module.exports = router