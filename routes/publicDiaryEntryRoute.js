'use strict'

const express = require('express')
const router = express.Router()
const publicDiaryController = require('../controllers/publicDiaryController')

router.get('/', publicDiaryController.publicDiaryEntry_list_get) // 1. FIRST

//router.get('/:id', publicDiaryController.publicDiary_get)

//router.put('/', publicDiaryController.publicDiaryEntry_list_update)

router.post('/', publicDiaryController.publicDiary_post) // 2. THEN THIS!

//router.delete('/:id', publicDiaryController.publicDiary_delete)

module.exports = router
