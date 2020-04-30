'use strict'

const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const publicDiaryController = require('../controllers/publicDiaryController')

router.get('/', publicDiaryController.publicDiaryEntry_list_get)
router.get('/:bytitle', publicDiaryController.selectBySearch)

router.post(
  '/',
  [body('createdAt', 'Incorrect date format').isISO8601()],
  publicDiaryController.publicDiary_post
) // 2. THEN THIS!

router.delete('/:id', publicDiaryController.publicDiary_delete)

module.exports = router
