const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const { randomBytes } = require('crypto')
const { verifyUser } = require('../middlewares/auth')
const { createJWTToken, userTypes } = require('../utils/util')
const { default: axios } = require('axios')
const multer = require('multer')
const ejs = require('ejs')
const router = express.Router()
const fs = require('fs')
const Aws = require('aws-sdk')


// Configure AWS SDK with your credentials and region
Aws.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION,
  endpoint: `https://s3.${process.env.AWS_REGION}.amazonaws.com`
});

// Create an S3 instance
const s3 = new Aws.S3();


router.use(['/all', '/add', '/edit', '/delete', '/profile', '/profile-update'], verifyUser)

router.post('/add', async (req, res) => {
  try {
    const userExist = await User.findOne({ email: req.body.email })
    if (userExist) throw new Error('This email is already registered')

    const record = {
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: await bcrypt.hash(req.body.password, 10),
      createdOn: new Date()
    }
    if (req.user.type === userTypes.STANDARD_ADMIN) {
      record.departmentId = req.user.departmentId
      record.type = userTypes.STANDARD_ADMIN
    } else {
      record.type = req.body.type;
      if (req.body.type === userTypes.STANDARD_ADMIN) {
        record.departmentId = req.body.departmentId;
      }
    }

    const user = new User(record)

    await user.save()
    res.json({ user })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.post('/edit', async (req, res) => {
  try {

    if (!req.body.id) throw new Error('User id is required')
    if (!mongoose.isValidObjectId(req.body.id))
      throw new Error('User id is invalid')

    const user = await User.findById(req.body.id)
    if (!user) throw new Error('User does not exists')

    if (req.user.type === userTypes.STANDARD_ADMIN && user.departmentId.toString() !== req.user.departmentId.toString()) {
      throw new Error("invalid request")
    }

    const record = {
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      modifiedOn: new Date()
    }

    if (req.body.password)
      record.password = await bcrypt.hash(req.body.password, 10)

    await User.findByIdAndUpdate(req.body.id, record)

    let updatedUser = await User.findById(req.body.id)
    delete updatedUser.password

    res.json({ user: updatedUser })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.post('/delete', async (req, res) => {
  try {
    if (!req.body.id) throw new Error('User id is required')
    if (!mongoose.isValidObjectId(req.body.id))
      throw new Error('user id is invalid')

    const user = await User.findById(req.body.id)
    if (!user) throw new Error('User does not exists')

    if (req.body.id === req.user._id.toString())
      throw new Error('invalid request')

    if (req.user.type === userTypes.STANDARD_ADMIN && user.departmentId.toString() !== req.user.departmentId.toString()) {
      throw new Error("invalid request")
    }


    await User.findByIdAndDelete(req.body.id)
    res.json({ success: true })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.get('/profile', async (req, res) => {
  try {
    let user = await User.findById(req.user._id)
    user = user.toObject()
    delete user.password
    res.json({ user })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

const upload = multer();


router.post('/profile-update', upload.single('profilePicture'), async (req, res) => {
  try {
    if (!req.body.name) throw new Error('Name is required');

    const record = {
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      modifiedOn: new Date(),
    };

    if (req.file) {
      const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: `${req.user._id}/${req.user._id}-${req.file.originalname}`, // Generate a unique key for each file
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

    if (req.body.newPassword) {
      if (!req.body.currentPassword) throw new Error('Current password is required');

      if (!(await bcrypt.compare(req.body.currentPassword, req.user.password))) {
        throw new Error('Current password is incorrect');
      }

      if (req.body.newPassword.length < 6) {
        throw new Error('New password should be at least 6 characters long');
      }

      if (req.body.newPassword !== req.body.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      record.password = await bcrypt.hash(req.body.newPassword, 10);
    }

    await User.findByIdAndUpdate(req.user._id, record);
    let user = await User.findById(req.user._id);
    user = user.toObject();
    delete user.password;
    res.json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/signin', async (req, res) => {
  try {
    if (!req.body.email) throw new Error('Email is required')
    if (!req.body.password) throw new Error('password is required')
    let user = await User.findOne({ email: req.body.email })
    if (!user) throw new Error('Email or password is incorrect')
    if (!(await bcrypt.compare(req.body.password, user.password)))
      throw new Error('Email or password is incorrect')

    const token = await createJWTToken(user, 24 * 365 * 50)

    user = user.toObject()
    delete user.password

    res.json({
      user,
      token
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.post('/forgot-password', async (req, res) => {
  try {
    if (!req.body.email) throw new Error('Email is required')
    let user = await User.findOne({ email: req.body.email })
    if (!user) throw new Error('invalid request')

    const code =
      user._id.toString() +
      randomBytes(Math.ceil(25 / 2))
        .toString('hex')
        .slice(0, 25)
    await User.findByIdAndUpdate(user._id, { passwordResetCode: code })

    const resetPasswordURL =
      process.env.BASE_URL + 'admin/reset-password/' + code

    const data = {
      Recipients: {
        To: [user.email]
      },
      Content: {
        Body: [
          {
            ContentType: 'HTML',
            Content: await ejs.renderFile('./emails/resetPassword.ejs', {
              name: user.name,
              resetPasswordURL
            }),
            Charset: 'utf8'
          }
        ],
        Subject: 'Reset Password',
        from: process.env.EMAIL_FROM
      }
    }

    const response = await axios.post(
      'https://api.elasticemail.com/v4/emails/transactional',
      data,
      {
        headers: {
          'X-ElasticEmail-ApiKey': process.env.EMAIL_API_KEY
        }
      }
    )
    console.log(response)
    user = user.toObject()
    delete user.password

    res.json({ success: true })
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message })
  }
})

router.post('/reset-password', async (req, res) => {
  try {
    if (!req.body.code) throw new Error('Code is required')
    if (!req.body.newPassword) throw new Error('New password is required')
    if (!req.body.confirmPassword)
      throw new Error('Confirm password is required')

    if (req.body.newPassword.length < 6)
      throw new Error('Password should have at least 6 characters')

    if (req.body.newPassword !== req.body.confirmPassword)
      throw new Error('Passwords are not same')

    let user = await User.findOne({ passwordResetCode: req.body.code })
    if (!user) throw new Error('Invalid request')

    await User.findByIdAndUpdate(user._id, {
      password: await bcrypt.hash(req.body.newPassword, 10),
      passwordResetCode: ''
    })

    res.json({ success: true })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.get('/all', async (req, res) => {
  try {
    // only super admin can see list of all departments Admin users
    let conditions = {}
    if (req.user.type === userTypes.STANDARD_ADMIN) {
      conditions.departmentId = req.user.departmentId;
      conditions.type = userTypes.STANDARD_ADMIN
    }
    const users = await User.find(conditions)
    res.json({ users })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

module.exports = router
