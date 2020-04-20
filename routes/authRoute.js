'use strict'
const express = require('express')
const router = express.Router()
const { body, check } = require('express-validator')
const authController = require('../controllers/authController')

router.post('/login', authController.login)
router.get('/logout', authController.logout)

router.post(
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

    check('name').escape(),
  ],
  authController.user_create_post,
  authController.login
)
/* router.post(
  '/register',
  [
    body('name', 'minimum 3 characters').isLength({ min: 3 }),
    body('username', 'email is not valid').isEmail(),
    body('password', 'at least one upper case letter').matches(
      '(?=.*[A-Z]).{8,}'
    ),
    check('name').escape(),
  ],
  authController.user_create_post,
  authController.login
) */

module.exports = router
