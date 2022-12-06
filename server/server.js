require('dotenv').config()
const express = require ('express')
// const mongoose  = require('mongoose')
const cors = require('cors')
const fileupload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/userRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const uploadRoutes = require('./routes/uploadRouter')
const productRoutes = require("./routes/productRouter")
const connection = require("./config/db")

const app = express()

///// connecting
connection()

///server use
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileupload({
    useTempFiles: true
}))

///routes 
app.use('/user', userRoutes)
app.use('/api', categoryRoutes)
app.use('/api', uploadRoutes)
app.use('/api', productRoutes)

//starting server
const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log('Server is running on port',PORT)
})
