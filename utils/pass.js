'use strict'
const passport = require('passport')
const bcrypt = require('bcryptjs')
const Strategy = require('passport-local').Strategy
const userModel = require('../models/userModel')
const passportJWT = require('passport-jwt')
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

// local strategy for username password login
passport.use(
  new Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      console.log('email', email)
      console.log('password', password)
      const params = [email]

      console.log('password', password)

      console.log('perkule', params)
      try {
        const [user] = await userModel.getUserLogin(params)

        console.log('awaited user', user)

        console.log('Local strategy', user)
        if (user === undefined) {
          // user not found
          return done(null, false)
        }

        // use bcrypt to check if password don't match
        const correctPassword = await bcrypt.compare(password, user.password)

        if (!correctPassword) {
          console.log('Incorrect password')
          return done(null, false)
        }

        delete user.password
        return done(null, { ...user })
      } catch (err) {
        throw done(err)
      }
    }
  )
)
