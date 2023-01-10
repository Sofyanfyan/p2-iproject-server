const router = require('express').Router()
const userRouter = require('./user')
const gameRouter = require('./game')
const authentication = require('../middlewares/authentication')
const Controller = require('../controllers')

router.use('/users', userRouter)

router.use('/google-login', Controller.loginGoogle)

router.use(authentication)

router.use('/games', gameRouter)


module.exports = router