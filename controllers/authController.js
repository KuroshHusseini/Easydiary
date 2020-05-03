const bcrypt = require('bcryptjs')
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

const user_create_post = async (req, res) => {
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

    const response = await userModel.insertUser(params)

    if (response.errno) {
      console.log('User already exists')
      res.status(400).json({ error: 'User already exists.' })
    } else {
      console.log('User has been successfully created')
      res.status(201).json({
        message: 'User has been successfully created.',
        user: params,
      })
    }
  }
}

const login = (req, res, next) => {
  console.log('success')
  console.log('req.user success', req.user)

  try {
    if (req.err || !req.user) {
      const error = new Error('An Error occurred')
      return next(error)
    }
    req.login(req.user, { session: false }, async (error) => {
      if (error) return next(error)

      console.log('app.post /login', req.user)
      //We don't want to store the sensitive information such as the
      //user password in the token so we pick only the email and id
      const body = { userId: req.user.userId, email: req.user.email }

      console.log('body:', body)
      //Sign the JWT token and populate the payload with the user email and id
      const token = jwt.sign({ user: body }, process.env.TOKEN)

      return res.json({ token })
    })
  } catch (error) {
    return next(error)
  }
}

//res.redirect('/')

const logout = (req, res) => {
  req.logout()
  res.redirect('/login')
}

module.exports = {
  user_create_post,
  login,
  logout,
}
