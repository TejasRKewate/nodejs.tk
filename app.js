const express = require('express')
const app = express()
const db = require('./db')
const router = require('./routes/userRoutes')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const port = process.env.PORT || 8000


app.use(cookieParser());
app.use(express.json())
app.use(cors())
app.use('/auth/api',router)
app.get('/' , (req , res)=>{

   res.send('hello from simple server :)')

})


app.listen(port , ()=> console.log('> Server is up and running on port : ' + port))