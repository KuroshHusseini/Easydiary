'use strict'

console.log('hello world')

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

// Settings
const settingsRoute = require('./routes/settingsRoute')

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

/*
app.get('/test', (req, res) => {

  console.log('im here daddy')
  res.send(`coming to get you baby`)
})*/
/*
app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
)
*/

/* For localhsot or VM */

process.env.NODE_ENV = process.env.NODE_ENV || 'development'
if (process.env.NODE_ENV === 'production') {
  require('./remote')(app, process.env.PORT)
} else {
  require('./localhost')(app, process.env.PORT)
}

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

app.use(
  '/user/settings',
  passport.authenticate('jwt', { session: false }),
  settingsRoute
)

app.use('/', authRoute)

/*
app.get('/', (req, res) => {
  res.send(`Hello secure? ${req.secure}`)
})
*/
/* app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
) */
