'use strict'
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const userModel = require('../models/userModel')
const { validationResult } = require('express-validator')

const login = (req, res) => {
  // TODO: add passport authenticate
  passport.authenticate('local', { session: false }, (err, user, info) => {
    console.log('user', user)
    console.log('error', err)

    if (err || !user) {
      return res.status(422).json({
        message: 'Something is not right',
        user: user,
      })
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.status(401).json({
          message: 'Unauthorized',
          user: user,
        })
      }
      // generate a signed json web token with the contents of user object and return it in the response
      console.log('jwt', user)
      const token = jwt.sign(user, process.env.TOKEN)
      return res.json({ user, token })
    })
  })(req, res)
}

const user_create_post = async (req, res, next) => {
  console.log('req.body', req.body)

  console.log('username', req.body.username)
  console.log('password', req.body.password)

  // Extract the validation errors from a request.
  const errors = validationResult(req) // TODO require validationResult, see userController

  if (!errors.isEmpty()) {
    console.log('user create error', errors)
    res.send(errors.array())
  } else {
    // TODO: bcrypt password
    const saltRounds = 12
    const passwordHash = await bcrypt.hash(req.body.password, saltRounds)

    const params = {
      ...req.body,
      password: passwordHash,
    }

    if (await userModel.insertUser(params)) {
      next()
    } else {
      res.status(400).json({ error: 'register error' })
    }
  }
}

const logout = (req, res) => {
  req.logout()
  res.json({ message: 'logout' })
}

module.exports = {
  user_create_post,
  login,
  logout,
}
