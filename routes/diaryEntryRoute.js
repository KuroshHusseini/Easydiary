'use strict'
const express = require('express')
const router = express.Router()
const {body, sanizebody} = require('express-validator')
const diaryEntryController = require('../controllers/diaryEntryController')

router.get('/', diaryEntryController.diaryEntry_list_get())
router.get('/:id', diaryEntryController.diary_get())
router.post('/hack', (req, res) => {
    res.send(req.body.search)
})
