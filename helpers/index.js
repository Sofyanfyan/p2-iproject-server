const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const {JWT_SECRET} = process.env

const hashPassword = (password) => {

   return bcrypt.hashSync(password, 10)
}

const comparePassword = (origin, password) => {

   return bcrypt.compareSync(origin, password)
}

const signToken = (payload) => {
   
   return jwt.sign(payload, JWT_SECRET)
}

const verifyToken = (token) => {

   return jwt.verify(token, JWT_SECRET)
}


module.exports = {
   hashPassword,
   comparePassword,
   signToken,
   verifyToken,
}