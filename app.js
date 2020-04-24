'use strict'

// userModel
const userModel = require('./models/userModel')
const jwt = require('jsonwebtoken')
const url = require('url')

const path = require('path')
const cors = require('cors')
const express = require('express')
const session = require('express-session')
const bcrypt = require('bcryptjs')
const { validationResult, body } = require('express-validator')

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

const secureRoute = require('./routes/secure-route')

app.get('/', (req, res) => {
  res.render('home')
})

//We plugin our jwt strategy as a middleware so only verified users can access this route
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute)

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

app.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('An Error occurred')
        return next(error)
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error)
        //We don't want to store the sensitive information such as the
        //user password in the token so we pick only the email and id
        const body = { userId: user.userId, email: user.email }

        console.log('body:', body)
        //Sign the JWT token and populate the payload with the user email and id
        const token = jwt.sign({ user: body }, process.env.TOKEN)
        //Send back the token to the user
        return res.json({ token })
      })
    } catch (error) {
      return next(error)
    }
  })(req, res, next)
})

app.post(
  '/register',
  [
    body('firstName', 'Min 3 chars, required').isLength({ min: 3 }),
    body('lastName', 'Min 3 chars, required').isLength({ min: 3 }),
    body('username', 'Min 3 chars, required').isLength({ min: 3 }),
    body('email', 'Email address must be valid').isEmail(),
    body('password', 'Min 8 chars, at least one capital letter').matches(
      '(?=.*[A-Z]).{8,}'
    ),
    body('sex', 'Min 4 chars, required.').isLength({ min: 4 }),
    body('birthDate', 'Incorrect date').isISO8601(),
  ],
  async (req, res, next) => {
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
      console.log('responsius', response)

      if (response.error) {
        console.log('User already exists')
        res.status(400).json({ error: 'User already exists.' })
      } else {
        console.log('User successfully created')
        res
          .status(201)
          .json({ message: 'User successfully created.', user: params })
      }
    }
  }
)

app.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/login')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

/* app.post(
  '/login',
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('An Error occurred')
        return next(error)
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error)
        //We don't want to store the sensitive information such as the
        //user password in the token so we pick only the email and id
        const body = { userId: user.userId, email: user.email }

        console.log('body oh yeah', body)
        //Sign the JWT token and populate the payload with the user email and id
        const token = jwt.sign({ user: body }, process.env.TOKEN)
        //Send back the token to the user
        return res.json({ token })
      })
    } catch (error) {
      return next(error)
    }
  })(req, res, next)
) */

/* app.post(
  '/login',
  passport.authenticate('login', { failureRedirect: '/login' }),
  (req, res) => {
    console.log('req login', req.user)
    console.log('success')

    res.redirect('/home')
  }
) */

/* app.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('An Error occurred')
        return next(error)
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error)
        //We don't want to store the sensitive information such as the
        //user password in the token so we pick only the email and id
        const body = { userId: user.userId, email: user.email }
        //Sign the JWT token and populate the payload with the user email and id
        const token = jwt.sign({ user: body }, 'top_secret')
        //Send back the token to the user

        res.redirect(
          url.format({
            pathname: '/home',
            query: {
              a: { token },
              b: 2,
              valid: 'your string here',
            },
          })
        )
        //res.json({ token })
        //res.redirect('/home')
      })
    } catch (error) {
      return next(error)
    }
  })(req, res, next)
}) */

/* app.post('/login', (req, res, next) => {
  passport.authenticate('login', (err, user, info) => {
    console.log('err', err)
    console.log('user', user)
    console.log('info', info)

    console.log('req.user', req.user)
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.redirect('/login')
    }
    console.log('going to home')
    res.redirect('/home')
  })(req, res, next)
}) */

/* app.post('/login', (req, res, next) => {
  // TODO: add passport authenticate
  passport.authenticate('login', (err, user, info) => {
    //console.log('user', user)
    //console.log('error login and stuff', err)

    console.log('req.user and stuff', req.user)
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
      //return next()
      // generate a signed json web token with the contents of user object and return it in the response
      console.log('jwt', user)
      //res.cookie('logged', true)

      //console.log('COOKIE LOGGED STATUS:', req.cookies.logged)
      //res.redirect('/home')
      const token = jwt.sign(user, process.env.TOKEN)
      return res.json({ user, token })
    })
  })(req, res, next)
}) */
