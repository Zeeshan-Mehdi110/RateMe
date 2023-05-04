const jwt = require("jsonwebtoken");
const User = require("../models/User")
require("dotenv").config()

const verifyUser = async (req,res,next) => {
  try {
    if(!req.headers.authorization) {
      throw new Error("invalid request")
    }
    const token = req.headers.authorization.slice(7)
    if(!token)
    throw new Error("invalid request")

    const decoded_token = await new Promise((resolve,reject)=> {
      jwt.verify(token,process.env.JWT_ENCRYPTION_KEY,async (err,decoded)=> {
        if(err) reject(new Error("invalid request"))
        else resolve(decoded)
      })
    })

    const user = await User.findById(decoded_token.uid)
    if(!user) throw new Error("invalid request")
    req.user = user;
    next()

  } catch (error) {
    res.status(401).json({ error : error.message }).end()
  }
}

module.exports = {
  verifyUser,
}