const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Department = require('../models/Department')
const User = require('../models/User')
const { verifyUser } = require('../middlewares/auth')
const { userTypes } = require('../utils/util')

const multer = require('multer')
const fs = require('fs').promises
const path = require('path')

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      await fs.mkdir(`content/departments/`, {
        recursive: true
      })
      cb(null, `content/departments/`)
    } catch (err) {
      cb(err, null)
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['jpg', 'png', 'gif', 'bmp', 'jpeg']
    const ext = path.extname(file.originalname).replace('.', '')
    if (allowedTypes.includes(ext)) cb(null, true)
    else {
      cb(new Error('File type is not allowed'), false)
    }
  }
})

router.use(verifyUser)

router.post('/add', upload.single('logo'), async (req, res) => {
  try {
    // only super admin can add department
    if (req.user.type !== userTypes.SUPER_ADMIN)
      throw new Error('Invalid Request')

    const record = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address
    }
    if (req.file && req.file.filename) {
      record.logo = req.file.filename
    }

    const department = new Department(record)

    await department.save()
    res.json({ department })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.post('/edit', upload.single('logo'), async (req, res) => {
  try {
    if (!req.body.id) throw new Error('Department id is required')
    if (!mongoose.isValidObjectId(req.body.id))
      throw new Error('Department id is invalid')

    const department = await Department.findById(req.body.id)
    if (!department) throw new Error('Department does not exists')

    //check if logged in user is not super admin and that user
    //has access to its own department
    if (
      req.user.type !== userTypes.SUPER_ADMIN &&
      req.user._id.toString() !== department.userId.toString()
    )
      // to string is used to convert req.user._id to string because this returns new ObjectId("6439f4ca31d7babed61963e0") that is object user id and we need only string to compare it.
      throw new Error('Invalid request')

    const record = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address
    }

    if (req.file && req.file.filename) {
      record.logo = req.file.filename
      if (department.logo && department.logo !== req.file.fieldname)
        await fs.unlink('content/departments/' + department.logo)
    }

    await Department.findByIdAndUpdate(req.body.id, record)

    res.json({ department: await Department.findById(req.body.id) })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.post('/delete', async (req, res) => {
  try {
    if (!req.body.id) throw new Error('Department id is required')
    if (!mongoose.isValidObjectId(req.body.id))
      throw new Error('Department id is invalid')

    //only super admin can delete department
    if (req.user.type !== userTypes.SUPER_ADMIN)
      throw new Error('Invalid Request')

    const department = await Department.findById(req.body.id)
    if (!department) throw new Error('Department does not exists')

    if (department.logo) {
      await fs.unlink(`content/departments/${department.logo}`)
    }

    await Department.findByIdAndDelete(req.body.id)

    res.json({ success: true })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.get('/', async (req, res) => {
  try {
    //only super admin can see list of departments
    // if (req.user.type !== userTypes.SUPER_ADMIN)
    //   throw new Error('Invalid Request')

    const departments = await Department.find()

    res.status(200).json({ departments })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

module.exports = router
