const mongoose = require("mongoose")
const moment = require("moment/moment")

const departmentSchema = new mongoose.Schema({
  departmentName : {
    type : String,
  },
  departmentEmail : {
    type : String,
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
  userId : {
    type : mongoose.Schema.Types.ObjectId
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