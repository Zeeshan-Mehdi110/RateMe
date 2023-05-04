const mongoose = require("mongoose")
const moment = require("moment/moment")

const employeeSchema = new mongoose.Schema({
  name : {
    type : String,
  },
  email : {
    type : String,
  },
  phone_number : {
    type : Number,
  },
  id_card : {
    type : String,
  },
  designation : {
    type : String,
  },
  rating : {
    type : Number,
  },
  profile_picture : {
    type : String,
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


const Employee = mongoose.model("employees",employeeSchema)

module.exports = Employee