const passport = require('passport')
const Strategy = require('passport-local').Strategy
const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')

// fake database: ****************
const users = [
  {
    user_id: 1,
    name: 'Foo Bar',
    email: 'foo@bar.fi',
    password: 'foobar',
  },
  {
    user_id: 2,
    name: 'Bar Foo',
    email: 'bar@foo.fi',
    password: 'barfoo',
  },
]
// *******************

// fake database functions *********
const getUser = (id) => {
  const user = users.filter((usr) => {
    if (usr.user_id === id) {
      return usr
    }
  })
  return user[0]
}

const getUserLogin = (email) => {
  const user = users.filter((usr) => {
    if (usr.email === email) {
      return usr
    }
  })
  return user[0]
}
// *****************

// serialize: store user id in session
passport.serializeUser((id, done) => {
  console.log('serialize', id)
  // serialize user id by adding it to 'done()' callback
  done(null, id)
})

// deserialize: get user id from session and get all user data
passport.deserializeUser(async (id, done) => {
  /*   // get user data by id from getUser
  const user = getUser(id)
  delete user.password
  console.log('deserialize', user)
  // deserialize user by adding it to 'done()' callback
  done(null, user) */
  // get user data by id from getUser

  const user = await userModel.getUserById(id)
  delete user.password
  console.log('deserialize', user)
  // deserialize user by adding it to 'done()' callback
  done(null, user)
})

passport.use(
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
        return done(null, user.userId)
      } catch (err) {
        throw done(err)
      }
    }
  )
)

module.exports = passport
