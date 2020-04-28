'use strict'

const path = require('path')
const cors = require('cors')
const express = require('express')
const session = require('express-session')

const passport = require('./utils/pass')
const app = express()

const cons = require('consolidate')

// Route requires
const diaryEntryRoute = require('./routes/diaryEntryRoute')
const publicDiaryEntryRoute = require('./routes/publicDiaryEntryRoute')
const authRoute = require('./routes/authRoute')
const pageRoute = require('./routes/pageRoute')
//const publicDiaryEntryRoute = require('./routes/publicDiaryEntryRoute');

const middleware = require('./utils/middleware')

// View engine setup HTML!
app.engine('html', cons.swig)
app.use(express.static('views')) // To serve JAVASCRIPT AND CSS FILES IN HTML!!
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')

app.use('/thumbnails', express.static('thumbnails'))
app.use(express.static('uploads'))

app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-login-urlencoded

app.use(
  session({
    secret: 'salainen kissa',
    resave: false,
    saveUninitialized: false,
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use(middleware.requestLogger)

// ROUTES

app.use('/', pageRoute)

app.use(
  '/diary/user',
  passport.authenticate('jwt', { session: false }),
  diaryEntryRoute
)
app.use(
  '/diary/all',
  passport.authenticate('jwt', { session: false }),
  publicDiaryEntryRoute
)

app.use('/', authRoute)

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
)
