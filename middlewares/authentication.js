const { verifyToken } = require("../helpers")
const { User } = require('../models')
const authentication = async (req, res, next) => {

   try {
      
      const { access_token } = req.headers

      if(!access_token){
         throw {name: 'Invalid token'}
      }

      const payload = verifyToken(access_token)

      const user = await User.findOne({
         where:{
            id: payload.id
         }
      })

      if(!user){
         throw {name: 'Invalid token'}
      }


      req.user = {
         id: user.id
      }

      next()

   } catch (error) {
      next(error)
   }
}

module.exports = authentication