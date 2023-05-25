const mongoose = require('mongoose')
const moment = require('moment/moment')

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    maxlength: 20
  },
  logo: {
    type: String
  },
  address: {
    type: String
  },

  rating: {
    type: Number
  },
  createdOn: {
    type: Date,
    default: moment().format('YYYY-MM-DD')
  },

  modifiedOn: {
    type: Date,
    default: moment().format('YYYY-MM-DD')
  }
})

const Department = mongoose.model('departments', departmentSchema)

module.exports = Department
