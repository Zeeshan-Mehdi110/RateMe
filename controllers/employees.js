const express = require("express")
const mongoose = require("mongoose")
const Employee = require("../models/Employee");
const User = require("../models/User");
const { verifyUser } = require("../middlewares/user_auth");
const { userTypes } = require("../utils/util");
const Department = require("../models/Department");
const router = express.Router()

router.use(verifyUser)

router.post("/add", async (req, res) => {
  try {
   // only standard Admin can add Employees to his own departments only
    if(req.user.type !== userTypes.STANDARD_ADMIN)
      throw new Error("invalid request")

    const department = await Department.findOne({ user_id: req.user._id })
    if (!department) throw new Error("Department does not exists")
    // check if the user has access to its own department or not
    if (req.user._id.toString() !== department.user_id.toString())
      throw new Error("invalid request")

    const {
      name,
      email,
      logo,
      address,
      phone_number,
      id_card
    } = req.body
    const employee = new Employee({
      name,
      email,
      logo,
      department_id : department._id,
      id_card,
      address,
      phone_number
    })
    await employee.save();

    res.json({ employee })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.post("/edit", async (req, res) => {
  try {
    if (!req.body.id) throw new Error("Employee id is required")
    if (!mongoose.isValidObjectId(req.body.id)) throw new Error("Employee id is invalid")

    if(req.user.type !== userTypes.STANDARD_ADMIN)
    throw new Error("invalid request")

    const department = await Department.findOne({ user_id: req.user._id })
    if (!department) throw new Error("Department does not exists")

    if (req.user._id.toString() !== department.user_id.toString())
      throw new Error("invalid request")

    const employee = await Employee.findById(req.body.id)
    if (!employee) throw new Error("Employee does not exists")
       // check if the standard admin is updating its own department
    if (department._id.toString() !== employee.department_id.toString())
      throw new Error("invalid request")

    await Employee.updateOne(
      { _id : employee._id , department_id : department._id},
      { $set : req.body}
    )
    const updatedEmployee = await Employee.findById(req.body.id);

    res.json({ employee: updatedEmployee })

  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.post("/details/:employee_id", async (req, res) => {
  try {
    if (!req.params.employee_id) throw new Error("Employee id is required")
    if (!mongoose.isValidObjectId(req.params.employee_id)) throw new Error("Employee id is invalid")

    if(req.user.type !== userTypes.STANDARD_ADMIN)
    throw new Error("invalid request")

    const department = await Department.findOne({ user_id: req.user._id })
    if (!department) throw new Error("Department does not exists")

    if (req.user._id.toString() !== department.user_id.toString())
      throw new Error("invalid request")

    const employee = await Employee.findById(req.params.employee_id)
    if (!employee) throw new Error("Employee does not exists")
       // check if the standard admin is updating its own department
    if (department._id.toString() !== employee.department_id.toString())
      throw new Error("invalid request")

    res.json( employee )

  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.delete("/delete", async (req, res) => {
  try {
    if (!req.body.id) throw new Error("Employee id is required")
    if (!mongoose.isValidObjectId(req.body.id)) throw new Error("Employee id is invalid")

    if(req.user.type !== userTypes.STANDARD_ADMIN)
    throw new Error("invalid request")

    const department = await Department.findOne({ user_id: req.user._id })
    if (!department) throw new Error("Department does not exists")

    if (req.user._id.toString() !== department.user_id.toString())
      throw new Error("invalid request")

    const employee = await Employee.findById(req.body.id)
    if (!employee) throw new Error("Employee does not exists")
      // check if the standard admin 
    if (department._id.toString() !== employee.department_id.toString())
      throw new Error("invalid request")

    await Employee.deleteOne({ _id : req.body.id , department_id : department._id })
    res.json({ success: true })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }

})

router.post("/search", async (req, res) => {
  try {
    if(req.user.type !== userTypes.STANDARD_ADMIN)
    throw new Error("invalid request")

    const department = await Department.findOne({ user_id: req.user._id })
    if (!department) throw new Error("Department does not exists")

    if (req.user._id.toString() !== department.user_id.toString())
      throw new Error("invalid request")

  

    const employees = await Employee.find(req.body)
    res.json( {employees} )
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

module.exports = router