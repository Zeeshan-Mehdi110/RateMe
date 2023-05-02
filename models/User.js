const mongoose = require("mongoose")
const moment = require("moment/moment")

const userSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true,
  },
  email : {
    type : String,
    required : true,
  },
  phone_number : {
    type : Number,
    required : true,
  },
  password : {
    type : String,
    required : true,
    maxlength : 100,
  },
  password_reset_code : {
    type : String,
  },
  profile_picture : {
    type : String,
    required : true,
  },
  type : {
    type : Number,
    required : true,
  },
  department_id : {
    type : mongoose.Schema.Types.ObjectId
  },
  created_on : {
    type : Date,
    default : moment().format("YYYY-MM-DD")
  },
  modified_on : {
    type : Date,
    default : moment().format("YYYY-MM-DD")
  },
})


const User = mongoose.model("users",userSchema)

module.exports = User