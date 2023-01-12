if (process.env.NODE_ENV !== 'production') {
   require('dotenv').config();
}
   
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = require('./routes/router')
const cors = require('cors')

app.use(cors())

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(router)

app.use((err, req, res, next) => {

   let code = 500
   let message = {message: 'Internal server error'}

   if(err.name === 'SequelizeValidationError'){
      code = 400
      message.message = err.errors[0].message
   } else if (err.name === 'SequelizeUniqueConstraintError'){
      code = 400
      message.message = 'Email has been registered'
   } else if (err.name === 'Invalid email or password'){
      code = 401
      message.message = err.name
   } else if (err.name === 'Email is required' || err.name === 'Password is required'){
      code = 400
      message.message = err.name
   } else if (err.name === 'Invalid token' || err.name === 'JsonWebTokenError'){
      code = 401
      message.message = 'Invalid token'
   } else if (err === 'Game not found'){
      code = 404
      message.message = 'Game not found'
   } else if (err.name === 'Forbidden'){
      code = 403
      message.message = err.name
   } else if (err.name === 'Id Favorite not found'){
      code = 404
      message.message = err.name
   }

   console.log(err);
   res.status(code).json(message)
})

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})