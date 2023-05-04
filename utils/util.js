const jwt = require("jsonwebtoken")
const moment = require("moment")

const userTypes = {
  SUPER_ADMIN: 1,
  STANDARD_ADMIN: 2,
}

// create jwt token function

const createJWTToken = (user, expiryINHours = 6) => {
  const payload = {
    uid: user._id,
    iat: moment().unix(),
    exp: moment().add(expiryINHours, "hours").unix(),
    claims: {
      name: user.name,
      email: user.email
    },
  }

  // promise is used for async tasks

  let myPromise = new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.JWT_ENCRYPTION_KEY, (err, token) => {
      if (err) reject(err)
      else resolve(token)
    })
  })
  return myPromise
}

module.exports = {
  userTypes,
  createJWTToken
}