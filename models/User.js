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
  email_verification_code : {
    type : String,
  },
  profile_picture : {
    type : String,
    required : true,
  },
  status : {
    type : Number,
  },
  type : {
    type : Number,
    required : true,
  },
  active : {
    type : Number
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
userSchema.set('toJSON', {
  getters: true,
  transform: (doc, ret, options) => {
    ret.created_on = moment(ret.created_on).format('YYYY-MM-DD');
    ret.modified_on = moment(ret.modified_on).format('YYYY-MM-DD');
    return ret;
  }
});

const User = mongoose.model("users",userSchema)

module.exports = User