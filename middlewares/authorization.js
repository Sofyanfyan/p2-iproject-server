const {
   User,
   Favorite
} = require('../models')


const asthorization = async (req, res, next) => {
   try {
      
      const {id} = req.params;
      
      if(!id){
         throw {name: 'Id Favorite not found'}
      }
      // console.log(id, '<<<<<<<ID');

      const Fav = await Favorite.findOne({
         where: {
            id
         }
      })


      if(!Fav){
         throw {name: 'Id Favorite not found'}
      }

      console.log(Fav.UserId);
      console.log(req.user.id)
      if(Fav.UserId !== req.user.id){
         throw {name: 'Forbidden'}
      }

      next()

   } catch (error) {
      next(error)
   }
}


module.exports = asthorization