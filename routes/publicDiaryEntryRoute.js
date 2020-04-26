'use strict'

const express = require('express')
const router = express.Router()
const publicDiaryController = require('../controllers/publicDiaryController')

router.get('/', publicDiaryController.publicDiaryEntry_list_get)

router.get('/:id', publicDiaryController.publicDiary_get)

//dont know how to do
router.put('/', publicDiaryController.publicDiaryEntry_list_update);

router.post('/', publicDiaryController.publicDiary_post)

router.post('/', publicDiaryController.publicDiary_post)

router.delete('/:id', publicDiaryController.publicDiary_delete)

module.exports = router
