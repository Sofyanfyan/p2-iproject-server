const {
   comparePassword,
   signToken
} = require('../helpers')
const {
   User,
   Favorite
} = require('../models')
const axios = require('axios')
const midtransClient = require('midtrans-client');

const {
   OAuth2Client
} = require('google-auth-library');

const CLIENT_ID = process.env.CLIENT_ID

const client = new OAuth2Client(CLIENT_ID);

class Controller {

   static async register(req, res, next) {

      try {

         const {
            username,
            email,
            password
         } = req.body

         const user = await User.create({
            username,
            email,
            password
         })

         res.status(201).json({
            id: user.id,
            username: user.username,
            email: user.email
         })

      } catch (error) {
         next(error)
      }
   }


   static async login(req, res, next) {

      try {

         const {
            email,
            password
         } = req.body

         if (!email) {
            throw {
               name: 'Email is required'
            }
         }
         if (!password) {
            throw {
               name: 'Password is required'
            }
         }

         const user = await User.findOne({
            where: {
               email
            }
         })

         if (!user) {
            throw {
               name: 'Invalid email or password'
            }
         }

         const validate = comparePassword(password, user.password)

         if (!validate) {
            throw {
               name: 'Invalid email or password'
            }
         }

         const payload = {
            id: user.id
         }

         const access_token = signToken(payload)

         res.status(200).json({
            access_token
         })

      } catch (error) {
         next(error)
      }
   }


   static async getGame(req, res, next) {

      try {

         const {
            category,
            sort,
            platform
         } = req.query

         let baseUrl = 'https://www.freetogame.com/api/games'

         if (category && sort && platform) {

            baseUrl = `https://www.freetogame.com/api/games?sort-by=${sort}&category=${category}&platform=${platform}`
         } else if (category && sort && !platform) {
            baseUrl = `https://www.freetogame.com/api/games?sort-by=${sort}&category=${category}`
         } else if (category && !sort && platform) {
            baseUrl = `https://www.freetogame.com/api/games?platform=${platform}&category=${category}`
         } else if (!category && sort && platform) {
            baseUrl = `https://www.freetogame.com/api/games?platform=${platform}&sort-by=${sort}`
         }

         const {
            data
         } = await axios({
            url: baseUrl,
            method: 'GET',
            headers: {
               "X-RapidAPI-Key": 'ce8641acb0msh337455a11030f40p1a1a58jsn3d5a9d4a74e8',
               "X-RapidAPI-Host": 'free-to-play-games-database.p.rapidapi.com'
            }
         })

         res.status(200).json(data)

      } catch (error) {
         next(error)
      }
   }

   static async gameId(req, res, next) {

      try {

         const {
            id
         } = req.params

         const {
            data
         } = await axios({
            url: 'https://www.freetogame.com/api/game?id=' + id,
            method: 'GET',
            headers: {
               "X-RapidAPI-Key": 'ce8641acb0msh337455a11030f40p1a1a58jsn3d5a9d4a74e8',
               "X-RapidAPI-Host": 'free-to-play-games-database.p.rapidapi.com'
            }
         })

         res.status(200).json(data)

      } catch (error) {


         next('Game not found')
      }
   }

   static async createFav(req, res, next) {

      try {

         const {
            id
         } = req.user
         const {
            gameId
         } = req.params

         const {
            data
         } = await axios({
            url: 'https://www.freetogame.com/api/game?id=' + gameId,
            method: 'GET',
            headers: {
               "X-RapidAPI-Key": 'ce8641acb0msh337455a11030f40p1a1a58jsn3d5a9d4a74e8',
               "X-RapidAPI-Host": 'free-to-play-games-database.p.rapidapi.com'
            }
         })

         const game = await Favorite.create({
            UserId: id,
            gameId: data.id,
            name: data.title,
            genre: data.genre,
            imageUrl: data.thumbnail,
            status: 'Uncompleted'
         })

         res.status(201).json(game)

      } catch (error) {

         next('Game not found')
      }
   }

   static async getFav(req, res, next) {

      try {

         const data = await Favorite.findAll({
            where: {
               UserId: req.user.id
            }
         })

         res.status(200).json(data)

      } catch (error) {
         next(error)
      }
   }

   static async loginGoogle(req, res, next) {

      try {

         // console.log(req.headers, '<<<<< Headers');
         const googleToken = req.headers.access_token

         // verivy oauth google token
         const ticket = await client.verifyIdToken({
            idToken: googleToken,
            audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
         });
         const payload = ticket.getPayload();
         console.log(payload, '<<<<<<< INI PAYLOAD');

         const {
            email,
            name
         } = payload
         const [user, created] = await User.findOrCreate({
            where: {
               email
            },
            defaults: {
               username: name,
               email,
               password: '123123',
               isSubs:false
            },
            hooks: false
         })

         const access_token = encodeToken({
            id: payload.id
         })
         // console.log(user);

         res.status(200).json({

            message: `User ${user.email} found`,
            access_token: encodeToken({
               id: user.id
            }),
            user: {
               name: user.username
            }
         })

      } catch (error) {
         next(error)
      }

   }


   static async payment(req, res, next) {

      try {

         const user = User.findByPk(req.user.id)

         let snap = new midtransClient.Snap({
            // Set to true if you want Production Environment (accept real transaction).
            isProduction: false,
            serverKey: process.env.MIDTRANS_SERVER_KEY
         });

         let parameter = {
            transaction_details: {
               order_id:  
               "TRANSACTION_" + Math.floor(1000000 + Math.random() * 9000000),
               gross_amount: 100000
            },
            credit_card: {
               secure: true
            },
            customer_details: {
               username: user.username,
               email: user.email,
            }
         };


         const mitransToken = await snap.createTransaction(parameter)
         res.status(201).json(mitransToken)
      } catch (error) {
         next(error)
      }
   }


   static async subs(req, res, next){

      try {
         
         await User.update({isSubs: true}, {
            where: {
               id: req.user.id
            }
         })

         res.status(200).json({ message: 'SUBSCRIPTION SUCCESS' })

      } catch (error) {
         next(error)
      }
   }
}


module.exports = Controller