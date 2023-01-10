const gameRouter = require('express').Router()
const Controller = require('../controllers')

gameRouter.get('/', Controller.getGame)
gameRouter.get('/favorites', Controller.getFav)
gameRouter.get('/:id', Controller.gameId)


gameRouter.post('/generate-mitrans-token', Controller.payment)
gameRouter.post('/favorites/:gameId', Controller.createFav)


gameRouter.patch('/subs', Controller.subs)

module.exports = gameRouter