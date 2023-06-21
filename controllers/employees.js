const express = require("express")
const mongoose = require("mongoose")
const Employee = require("../models/Employee");
const { verifyUser } = require("../middlewares/auth");
const { userTypes } = require("../utils/util");
const Department = require("../models/Department");
const Rating = require("../models/Rating");
const router = express.Router()
const multer = require('multer')
const path = require('path')
const Aws = require('aws-sdk')
const uuid = require("uuid");

router.use(["/add", "/edit", "/delete", "/details/:employeeId", "/search", "/dashboard", "/ratings"], verifyUser)

// Configure AWS SDK with your credentials and region
Aws.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION,
  endpoint: `https://s3.${process.env.AWS_REGION}.amazonaws.com`
});

// Create an S3 instance
const s3 = new Aws.S3();

const upload = multer({
  fileFilter: (req, file, cb) => {
    // cb = callback
    const allowedTypes = ['png', 'jpg', 'jpeg', 'gif', 'bmp']
    const ext = path.extname(file.originalname).replace('.', '')
    if (allowedTypes.includes(ext)) {
      cb(null, true)
    } else {
      cb(new Error('File type not allowed'), false)
    }
  }
})

router.post("/add", async (req, res) => {
  try {
    // only standard Admin can add Employees to his own departments only
    if (req.user.type !== userTypes.SUPER_ADMIN && req.body.deptId !== req.user.departmentId.toString())
      throw new Error("invalid request")

    const department = await Department.findById(req.body.deptId)
    if (!department) throw new Error("Department does not exists")

    const {
      name,
      email,
      phone,
      cnic,
      designation
    } = req.body
    const employee = new Employee({
      name,
      email,
      departmentId: department._id,
      phone,
      cnic,
      designation,
      profilePicture: "",
      createdOn: new Date(),
      modifiedOn: new Date()
    })
    await employee.save();

    res.json({ success: true })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.post("/edit", upload.single("profilePicture"), async (req, res) => {
  try {
    if (!req.body.id) throw new Error("Employee id is required")
    if (!mongoose.isValidObjectId(req.body.id)) throw new Error("Employee id is invalid")

    const employee = await Employee.findById(req.body.id)
    if (!employee) throw new Error("invalid employee id")

    if (req.user.type !== userTypes.SUPER_ADMIN && employee.departmentId.toString() !== req.user.departmentId.toString())
      throw new Error("invalid request")

    const {
      name,
      email,
      phone,
      cnic,
      designation
    } = req.body
    const record = {
      name,
      email,
      phone,
      cnic,
      designation,
      modifiedOn: new Date()
    }

    if (req.file) {
      const uniqueFilename = `employees/${uuid.v4()}-${req.file.originalname}`;
      const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: uniqueFilename, // Generate a unique key for each file
        Body: req.file.buffer,
      };

      const result = await s3.upload(params).promise();
      // Delete the local file after uploading to S3
      // fs.unlinkSync(req.file.path);
      record.profilePicture = result.Location; // Save the S3 object key as the profilePicture field

      // Delete the previous profile picture from S3 if it exists
      // if (req.user.profilePicture) {
      //   const oldPicParams = {
      //     Bucket: process.env.AWS_BUCKET,
      //     Key: req.user.profilePicture,
      //   };

      //   await s3.deleteObject(oldPicParams).promise();
      // }
    }

    await Employee.findByIdAndUpdate(req.body.id, record)
    const updatedEmployee = await Employee.findById(req.body.id);

    res.json({ success: true, employee: updatedEmployee })

  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.get("/details/:employeeId", async (req, res) => {
  try {
    if (!req.params.employeeId) throw new Error("Employee id is required")
    if (!mongoose.isValidObjectId(req.params.employeeId)) throw new Error("Employee id is invalid")

    const employee = await Employee.findById(req.params.employeeId)
    if (!employee) throw new Error("Invalid employee id")

    if (req.user.type !== userTypes.SUPER_ADMIN && employee.departmentId.toString() !== req.user.departmentId.toString())
      throw new Error("Invalid request")

    res.json({ employee })

  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})


router.get("/publicDetails/:employeeId", async (req, res) => {
  try {
    if (!req.params.employeeId) throw new Error("Employee id is required")
    if (!mongoose.isValidObjectId(req.params.employeeId)) throw new Error("Employee id is invalid")

    const employee = await Employee.findById(req.params.employeeId, { _id: 1, name: 1, profilePicture: 1, departmentId: 1 })
    if (!employee) throw new Error("invalid employee id")

    res.json({ employee })

  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.post("/delete", async (req, res) => {
  try {
    if (!req.body.id) throw new Error("Employee id is required")
    if (!mongoose.isValidObjectId(req.body.id)) throw new Error("Employee id is invalid")

    if (req.user.type !== userTypes.SUPER_ADMIN && employee.departmentId.toString() !== req.user.departmentId.toString())
      throw new Error("invalid request")

    const employee = await Employee.findById(req.body.id)
    if (!employee) throw new Error("Employee does not exists")

    await Employee.findByIdAndDelete(req.body.id)

    await Rating.deleteMany({ employeeId: req.body.id })

    const result = await Rating.aggregate([
      { $match: { departmentId: { $eq: employee.departmentId } } },
      { $group: { _id: null, avg_value: { $avg: "$rating" } } }
    ])
    if (result && result.length) {
      await Department.findByIdAndUpdate(employee.departmentId, { rating: result[0].avg_value.toFixed(1) })
    } else {
      await Department.findByIdAndUpdate(employee.departmentId, { rating: 0 })
    }

    res.json({ success: true })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }

})

router.post("/search", async (req, res) => {
  try {
    if (req.user.type !== userTypes.SUPER_ADMIN && req.body.deptId !== req.user.departmentId.toString())
      throw new Error("invalid request")

    const department = await Department.findById(req.body.deptId)
    if (!department) throw new Error("Department does not exists")

    const filters = { departmentId: req.body.deptId }
    if (req.body.query)
      filters["$text"] = { $search: req.body.query }

    const page = req.body.page ? req.body.page : 1;
    const skip = (page - 1) * process.env.RECORDS_PER_PAGE

    const employees = await Employee.find(filters, { _id: 1, profilePicture: 1, name: 1, phone: 1, cnic: 1, email: 1 }, { limit: process.env.RECORDS_PER_PAGE, skip })

    const totalEmployees = await Employee.countDocuments(filters);
    const numOfPages = Math.ceil(totalEmployees / process.env.RECORDS_PER_PAGE)
    res.json({ department, employees, numOfPages })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.post("/ratings", async (req, res) => {
  try {
    if (!req.body.employeeId) throw new Error("employee id is required")

    const employee = await Employee.findById(req.body.employeeId)
    if (!employee) throw new Error("employee does not exists")

    if (req.user.type !== userTypes.SUPER_ADMIN && employee.departmentId !== req.user.departmentId.toString())
      throw new Error("invalid request")

    const filters = { employeeId: req.body.employeeId }


    const page = req.body.page ? req.body.page : 1;
    const skip = (page - 1) * process.env.RECORDS_PER_PAGE

    const ratings = await Rating.find(filters, { _id: 1, name: 1, phone: 1, rating: 1, createdOn: 1, message: 1 }, { limit: process.env.RECORDS_PER_PAGE, skip, sort: { createdOn: -1 } })

    const totalRatings = await Rating.countDocuments(filters);
    const numOfPages = Math.ceil(totalRatings / process.env.RECORDS_PER_PAGE)

    res.json({ ratings, numOfPages })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.post("/feedback", async (req, res) => {
  if (!req.body.employeeId)
    throw new Error("Employee id is required")

  if (!req.body.rating)
    throw new Error("rating is required")

  const employee = await Employee.findById(req.body.employeeId)
  if (!employee) throw new Error("Employee does not exists")

  try {
    const {
      rating,
      name,
      phone,
      message,
      employeeId
    } = req.body

    if (rating < 0 || rating > 5)
      throw new Error("invalid request")



    const ratingData = Rating({
      name,
      phone,
      departmentId: employee.departmentId,
      employeeId,
      rating,
      message,
      createdOn: new Date()
    })
    await ratingData.save()

    let result = await Rating.aggregate([
      { $match: { employeeId: { $eq: new mongoose.Types.ObjectId(employeeId) } } },
      { $group: { _id: null, avg_value: { $avg: "$rating" } } }
    ])
    if (result && result.length) {
      await Employee.findByIdAndUpdate(employeeId, { rating: result[0].avg_value.toFixed(1) })
    }

    result = await Rating.aggregate([
      { $match: { departmentId: { $eq: employee.departmentId } } },
      { $group: { _id: null, avg_value: { $avg: "$rating" } } }
    ])
    if (result && result.length) {
      await Department.findByIdAndUpdate(employee.departmentId, { rating: result[0].avg_value.toFixed(1) })
    }

    res.json({ success: true })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.get('/dashboard', async (req, res) => {
  try {
    const stats = {
      departments: 0,
      employees: 0,
      ratings: 0
    }

    if (req.user.type == userTypes.SUPER_ADMIN)
      stats.departments = await Department.estimatedDocumentCount()

    if (req.user.type == userTypes.SUPER_ADMIN) {
      stats.employees = await Employee.estimatedDocumentCount()
      stats.ratings = await Rating.estimatedDocumentCount()
    } else {
      stats.employees = await Employee.countDocuments({ departmentId: req.user.departmentId })
      stats.ratings = await Rating.countDocuments({ departmentId: req.user.departmentId })
    }

    res.json({ stats })
  } catch (error) {
    res.status(400).json({ error: error.message })

  }
})

router.post("/publickSearch", async (req, res) => {
  try {
    if (!req.body.departmentId)
      throw new Error("departmentId is required")
    if (!req.body.name)
      throw new Error("name is required")

    const department = await Department.findById(req.body.departmentId);
    if (!department) throw new Error("Department does not exists");
    // $regex stands for regular-expresions and options i stands for case sensitive
    const filter = { departmentId: req.body.departmentId, name: { $regex: req.body.name, $options: 'i' } }

    const employees = await Employee.find(filter, { _id: 1, profilePicture: 1, departmentId: 1, name: 1, phone: 1, cnic: 1 })

    res.status(200).json({ employees });

  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

module.exports = router