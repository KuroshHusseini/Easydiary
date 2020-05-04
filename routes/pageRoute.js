const express = require('express')
const router = express.Router()

const loggedIn = (req, res, next) => {
  console.log('logged', req.user)
  if (req.user) {
    next()
  } else {
    res.redirect('./login')
  }
}

router.get('/', loggedIn, (req, res) => {
  res.redirect('./home')
})

router.get('/login', (req, res) => {
  if (req.user) {
    res.redirect('./home')
  } else {
    res.render('login')
  }
})

router.get('/home', loggedIn, (req, res) => {
  console.log('Render home')
  res.render('home')
})

router.get('/settings', loggedIn, (req, res) => {
  console.log('Render settings')
  res.render('settings')
})

router.get('/diary', loggedIn, (req, res) => {
  console.log('Render diary')
  res.render('userdiary')
})

router.get('/statistics', loggedIn, (req, res) => {
  console.log('Render diary')
  res.render('statistics')
})

router.get('/create', loggedIn, (req, res) => {
  console.log('Render create')
  res.render('create')
})

router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('./login')
})

module.exports = router
