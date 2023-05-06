const mongoose = require("mongoose")
const moment = require("moment/moment")

const employeeSchema = new mongoose.Schema({
  name : {
    type : String,
  },
  email : {
    type : String,
  },
  phoneNumber : {
    type : Number,
  },
  idCard : {
    type : String,
  },
  designation : {
    type : String,
  },
  rating : {
    type : Number,
  },
  profilePicture : {
    type : String,
  },
  departmentId : {
    type : mongoose.Schema.Types.ObjectId
  },
  createdOn : {
    type : Date,
    default : moment().format("YYYY-MM-DD")
  },
  modifiedOn : {
    type : Date,
    default : moment().format("YYYY-MM-DD")
  },
})


const Employee = mongoose.model("employees",employeeSchema)

module.exports = Employee