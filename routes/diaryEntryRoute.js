'use strict'

const express = require('express')
const router = express.Router()
const diaryController = require('../controllers/diaryController')

router.get('/', diaryController.diary_entry_list_get)

router.get('/:id', diaryController.diary_entry_get)

router.put('/', diaryController.diary_entry_list_update)

router.post('/', diaryController.diary_entry_post)

router.delete('/:id', diaryController.diary_entry_delete)

module.exports = router
