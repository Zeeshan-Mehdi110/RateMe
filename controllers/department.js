const express = require("express")
const mongoose = require("mongoose")
const Department = require("../models/Department");
const User = require("../models/User");
const { varifyUser } = require("../middlewares/user_auth");
const { userTypes } = require("../utills/util");
const router = express.Router()

router.use(varifyUser)

router.post("/add", async (req, res) => {
  try {
    // only super Admin can add Departments
    if(req.user.type !== userTypes.SUPER_ADMIN)
      throw new Error("invalid request")
    const user = await User.findById(req.user._id)
    if (!user) throw new Error("Department does not exists")
    const {
      department_name,
      department_email,
      logo,
      address,
      phone_number,
      user_id,
    } = req.body
    const department = new Department({
      department_name,
      department_email,
      logo,
      address,
      phone_number,
      user_id
    })
    await department.save();

    res.json({ department })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.post("/edit", async (req, res) => {
  try {

    if (!req.body.id) throw new Error("Department id is required")
    if (!mongoose.isValidObjectId(req.body.id)) throw new Error("Department id is invalid")

    
    const department = await Department.findById(req.body.id)
    if (!department) throw new Error("Department does not exists")
    // check if this is the user that has access to its own department
    // console.log(req.user._id.toString())
    // console.log( department.user_id.toString())
    if(req.user._id.toString() !== department.user_id.toString() )
      throw new Error("invalid request")
    
    // if (req.user._id.toString() !== req.body.id) throw new Error("invalid request")

    const {
      department_name,
      department_email,
      logo,
      address,
      phone_number
    } = req.body
    let updatedDepartment = await Department.findByIdAndUpdate(req.body.id, {
      department_name,
      department_email,
      logo,
      address,
      phone_number
    })
    res.json({ department: updatedDepartment })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.delete("/delete", async (req, res) => {
  try {
    if (!req.body.id) throw new Error("User id is required")
    if (!mongoose.isValidObjectId(req.body.id)) throw new Error("user id is invalid")

    const department = await Department.findById(req.body.id)
    if (!department) throw new Error("Department does not exists")

       // check if this is the user that has access to its own department
    console.log(req.user._id.toString())
    console.log( department.user_id.toString())
    // department.user_id = "6450f92183468bb2af1bcd5c"
    if(req.user._id.toString() !== department.user_id.toString() )
      throw new Error("invalid request")

    await Department.findOneAndDelete(req.body.id)
    res.json({ success: true })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }

})

router.get("/",async (req,res) => {
  try {
    if(req.user.type !== userTypes.SUPER_ADMIN )
      throw new Error("invalid request")
    const departments = await Department.find()
    res.json({departments})
  } catch (error) {
    res.status(400).json({ error : error.message })
  }
})

module.exports = router