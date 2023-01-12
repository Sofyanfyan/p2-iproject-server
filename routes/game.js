const gameRouter = require('express').Router()
const Controller = require('../controllers')
const asthorization = require('../middlewares/authorization')

gameRouter.get('/', Controller.getGame)
gameRouter.get('/favorites', Controller.getFav)
gameRouter.get('/:id', Controller.gameId)


gameRouter.post('/generate-mitrans-token', Controller.payment)
gameRouter.post('/favorites/:gameId', Controller.createFav)


gameRouter.patch('/subs', Controller.subs)


gameRouter.patch('/favorites/:id', asthorization, Controller.statusPatch)

module.exports = gameRouter