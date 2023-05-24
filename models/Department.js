const mongoose = require("mongoose")
const moment = require("moment/moment")

const departmentSchema = new mongoose.Schema({
<<<<<<< HEAD
  name: {
    type: String
  },
  email: {
    type: String
=======
  departmentName : {
    type : String,
  },
  departmentEmail : {
    type : String,
>>>>>>> parent of 6949e47 (compoleted  department module)
  },
  logo : {
    type : String,
  },
  address : {
    type : String,
  },
  rating : {
    type : Number
  },
<<<<<<< HEAD
  phone: {
    type: Number
=======
  userId : {
    type : mongoose.Schema.Types.ObjectId
>>>>>>> parent of 6949e47 (compoleted  department module)
  },
  phoneNumber : {
    type : Number,
  },
  active : {
    type : Number
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
departmentSchema.set('toJSON', {
  getters: true,
  transform: (doc, ret, options) => {
    ret.createdOn = moment(ret.createdOn).format('YYYY-MM-DD');
    ret.modifiedOn = moment(ret.modifiedOn).format('YYYY-MM-DD');
    return ret;
  }
});

const Department = mongoose.model("departments",departmentSchema)

module.exports = Department