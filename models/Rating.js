const mongoose = require("mongoose")
const moment = require("moment/moment")

const ratingSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  message: {
    type: String,
  },
  phone: {
    type: String,
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId
  },
  rating: {
    type: Number,
    required: true,
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  createdOn: {
    type: Date,
    default: moment().format("YYYY-MM-DD")
  },
})


const Rating = mongoose.model("ratings", ratingSchema)

module.exports = Rating