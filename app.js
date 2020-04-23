'use strict'
require('dotenv').config()
const middleware = require('./utils/middleware')

const path = require('path')
const cors = require('cors')
const express = require('express')
const cookieparser = require('cookie-parser')
const app = express()
app.use(cookieparser())
app.use(middleware.requestLogger)

var cons = require('consolidate')

// View engine setup
app.engine('html', cons.swig)
app.use(express.static('views')) // TO SERVER JAVASCRIPT AND CSS FILES IN HTML!!
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')

// ROUTES
const pass = require('./utils/pass')
const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoute')
//const userRoute = require('./routes/userRoute')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//app.use(express.static('public'))

app.get('/', (req, res) => {
  // Create cookie without expiration time

  res.render('login')
})

app.get('/home', (req, res) => {
  const loggedIn = req.cookies.logged === 'true'
  if (loggedIn) {
    res.render('home')
  } else {
    res.render('/')
  }
})

app.use('/auth', authRoute)
app.use('/user', userRoute)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}`)
})
