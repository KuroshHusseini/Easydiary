'use strict'

const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: './uploads/', fileFilter })
const diaryController = require('../controllers/diaryController')
const { body } = require('express-validator')

// dont save if not image: (needs to be hoisted, that's why not arrow function)
function fileFilter(req, file, done) {
  console.log('fileFilter', file)
  // The function should call `done` with a boolean
  // To indicate if the file should be accepted

  // To reject this file pass `false`, like so:
  if (!file.mimetype.includes('image')) {
    return done(null, false, new Error("I don't have a clue!"))
  } else {
    // To accept the file pass `true`, like so:
    done(null, true)
  }
}

router.get('/', diaryController.diary_entry_list_get)

router.get('/:id', diaryController.diary_entry_get)

router.put(
  '/',
  upload.single('image'),
  [
    body('title', 'Title cannot be empty.').isLength({ min: 1 }),
    body('noteText', 'Note text cannot be empty.').isLength({ min: 1 }),
    body('mood', 'Mood must be number.').isNumeric({ no_symbols: false }),
    body('dateTime', 'Incorrect date.').isISO8601(),
    //check('image').custom(diaryController.image_file_validator),
    //check('things').custom(catController.cat_file_validator), // cat_file_validator checks only req.file
  ],
  (req, res) => {
    console.log('tiedosto: ', req.file)
    diaryController.diary_entry_list_update(req, res)
  }
)

router.post(
  '/',
  upload.single('image'),
  [
    body('title', 'Title cannot be empty.').isLength({ min: 1 }),
    body('noteText', 'Note text cannot be empty.').isLength({ min: 1 }),
    body('mood', 'Mood must be number.').isNumeric({ no_symbols: false }),
    body('dateTime', 'Date cannot be empty.').isLength({ min: 1 }),
    //check('image').custom(diaryController.image_file_validator), // cat_file_validator checks only req.file
  ],
  (req, res) => {
    console.log('tiedosto: ', req.file)
    diaryController.diary_entry_post(req, res)
  }
)
router.delete('/:id', diaryController.diary_entry_delete)

module.exports = router
