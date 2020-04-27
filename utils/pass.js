'use strict'
const passport = require('passport')
const bcrypt = require('bcryptjs')
const Strategy = require('passport-local').Strategy
const userModel = require('../models/userModel')
const passportJWT = require('passport-jwt')
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

// serialize: store user id in session
passport.serializeUser((id, done) => {
  console.log('serialize', id)
  // serialize user id by adding it to 'done()' callback
  done(null, id)
})

// deserialize: get user id from session and get all user data
passport.deserializeUser(async (user, done) => {
  console.log('deserialize user', user)
  const newUser = await userModel.getUserById(user.userId)
  delete newUser.password
  console.log('deserialize', user)
  // deserialize user by adding it to 'done()' callback
  done(null, newUser)
})

passport.use(
  'login',
  new Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      // get user by username from getUserLogin
      console.log('email', email)
      console.log('password', password)
      const params = [email]

      try {
        const [user] = await userModel.getUserLogin(params)
        console.log('user and stuff', user)
        // console.log(username, password);
        // console.log('user', user);
        // if user is undefined

        console.log('awaited user', user)

        if (user === undefined) {
          return done(null, false)
        }

        // TODO: use bcrypt to check if password don't match
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: 'Incorrect email or password.' })
        }

        // if all is ok
        delete user.password

        console.log('all is okay. Here is the userId', user.userId)
        console.log(' Here is the user', user)
        return done(null, user, { message: 'Logged in Successfully' })
      } catch (err) {
        throw done(err)
      }
    }
  )
)

passport.use(
  new JWTStrategy(
    {
      secretOrKey: process.env.TOKEN,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        console.log('token user', token)
        // Pass the details to the next middleware
        return done(null, token.user)
      } catch (error) {
        done(error)
      }
    }
  )
)

/* 'use strict'
const passport = require('passport')
const bcrypt = require('bcryptjs')
const Strategy = require('passport-local').Strategy
const userModel = require('../models/userModel')
const passportJWT = require('passport-jwt')
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

// serialize: store user id in session
passport.serializeUser((id, done) => {
  console.log('serialize', id)
  // serialize user id by adding it to 'done()' callback
  done(null, id)
})

// deserialize: get user id from session and get all user data
passport.deserializeUser(async (user, done) => {
  console.log('deserialize user', user)
  const newUser = await userModel.getUserById(user.userId)
  delete newUser.password
  console.log('deserialize', user)
  // deserialize user by adding it to 'done()' callback
  done(null, newUser)
})

passport.use(
  'login',
  new Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      // get user by username from getUserLogin
      console.log('email', email)
      console.log('password', password)
      const params = [email]

      try {
        const [user] = await userModel.getUserLogin(params)
        console.log('user and stuff', user)
        // console.log(username, password);
        // console.log('user', user);
        // if user is undefined

        console.log('awaited user', user)

        if (user === undefined) {
          return done(null, false)
        }

        // TODO: use bcrypt to check if password don't match
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: 'Incorrect email or password.' })
        }

        // if all is ok
        delete user.password

        console.log('all is okay. Here is the userId', user.userId)
        console.log(' Here is the user', user)
        return done(null, user, { message: 'Logged in Successfully' })
      } catch (err) {
        throw done(err)
      }
    }
  )
)

passport.use(
  new JWTStrategy(
    {
      secretOrKey: process.env.TOKEN,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        console.log('token user', token)
        // Pass the details to the next middleware
        return done(null, token.user)
      } catch (error) {
        done(error)
      }
    }
  )
) */

// BACKUP
/* passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.TOKEN,
    },
    (jwtPayload, done) => {
      //find the user in db if needed. This functionality may be omitted
      //if you store everything you'll need in JWT payload.
      const user = userModel.getUserById(jwtPayload.userId)
      console.log('jwt payload and user', jwtPayload, user)
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    }
  )
) */

module.exports = passport
