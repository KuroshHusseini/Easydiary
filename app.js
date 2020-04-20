'use strict'
require('dotenv').config()
const middleware = require('./utils/middleware')

const cors = require('cors')
const express = require('express')
const app = express()

// ROUTES
const pass = require('./utils/pass')
const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoute')
//const userRoute = require('./routes/userRoute')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// app.use ROUTES
//app.use('/cat', )
//app.use('/user', userRoute)
app.use(middleware.requestLogger)

app.use('/auth', authRoute)
app.use('/user', userRoute)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}`)
})
