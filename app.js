'use strict'
const path = require('path')
const cors = require('cors')
const express = require('express')
const session = require('express-session')
const passport = require('./utils/pass')
const app = express()
const port = 3000

const cons = require('consolidate')

// View engine setup
app.engine('html', cons.swig)
app.use(express.static('views')) // TO SERVER JAVASCRIPT AND CSS FILES IN HTML!!
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')

const loggedIn = (req, res, next) => {
  console.log('logged', req.user)
  if (req.user) {
    next()
  } else {
    res.redirect('/login')
  }
}

app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-login-urlencoded

app.use(
  session({
    secret: 'salainen kissa',
    resave: false,
    saveUninitialized: true,
  })
)

app.use(passport.initialize())
app.use(passport.session())

//app.set('views', './views')
//app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/setCookie/:clr', (req, res) => {
  res.cookie('color', req.params.clr).send('cookie set')
})

app.get('/deleteCookie', (req, res) => {
  res.clearCookie('color')
  res.send('cookie color cleared')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/home', loggedIn, (req, res) => {
  res.render('home')
})

app.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  (req, res) => {
    console.log('success')
    res.redirect('/home')
  }
)

app.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/login')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
