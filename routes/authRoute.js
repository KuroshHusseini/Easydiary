'use strict'
const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
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
  ],
  authController.user_create_post
)

module.exports = router
