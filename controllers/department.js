const express = require("express")
const mongoose = require("mongoose")
const Department = require("../models/Department");
const User = require("../models/User");
const { verifyUser } = require("../middlewares/auth");
const { userTypes } = require("../utils/util");
const router = express.Router()

router.use(verifyUser)

router.post("/add", async (req, res) => {
  try {
    // only super Admin can add Departments
    if(req.user.type !== userTypes.SUPER_ADMIN)
      throw new Error("invalid request")
    const user = await User.findById(req.user._id)
    if (!user) throw new Error("Department does not exists")
    const {
      departmentName,
      departmentEmail,
      logo,
      address,
      phoneNumber,
      userId,
    } = req.body
    const department = new Department({
      departmentName,
      departmentEmail,
      logo,
      address,
      phoneNumber,
      userId
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
    console.log(req.user.type)
    // check if this is the user that has access to its own department
    if(req.user.type !== userTypes.SUPER_ADMIN && req.user._id.toString() !== department.userId.toString() )
    // both conditions need to be true in order for the error to be thrown with the message "invalid request".
      throw new Error("invalid request")

    const {
      departmentName,
      departmentEmail,
      logo,
      address,
      phoneNumber
    } = req.body
    let updatedDepartment = await Department.findByIdAndUpdate(req.body.id, {
      departmentName,
      departmentEmail,
      logo,
      address,
      phoneNumber
    })
    res.json({ department: updatedDepartment })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.delete("/delete", async (req, res) => {
  try {
    if (!req.body.id) throw new Error("Department id is required")
    if (!mongoose.isValidObjectId(req.body.id)) throw new Error("Department id is invalid")
      // only super admin can delete a department
    if(req.user.type !== userTypes.SUPER_ADMIN)
    throw new Error("invalid request")

    const department = await Department.findById(req.body.id)
    if (!department) throw new Error("Department does not exists")
       // check if this is the user that has access to its own department
    if(req.user._id.toString() !== department.userId.toString()) 
      throw new Error("invalid request")

    await Department.findOneAndDelete(req.body.id)
    res.json({ success: true })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }

})

router.get("/",async (req,res) => {
  try {
    // only super admin can see department
    if(req.user.type !== userTypes.SUPER_ADMIN )
      throw new Error("invalid request")
      
    const departments = await Department.find()
    res.json({departments})
  } catch (error) {
    res.status(400).json({ error : error.message })
  }
})

module.exports = router