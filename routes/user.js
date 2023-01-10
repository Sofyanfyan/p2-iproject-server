const userRouter = require('express').Router()
const Controller = require('../controllers')

userRouter.post('/register', Controller.register)
userRouter.post('/login', Controller.login)

module.exports = userRouter