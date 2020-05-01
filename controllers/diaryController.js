'use strict'

const diaryEntry = require('../models/diaryEntry')
const makeThumbnail = require('../utils/resize').makeThumbnail
const imageMeta = require('../utils/imageMeta')
const { validationResult } = require('express-validator')

const diary_entry_list_get = async (req, res) => {
  console.log('req.user.userid', req.user)

  const diaryEntries = await diaryEntry.getAllDiaryEntries(req.user.userId)

  res.json(diaryEntries)
}

const diary_entry_get = async (req, res) => {
  console.log('diary entry get', req.user.userId)
  console.log('diary entry id', req.params.id)

  const params = [req.user.userId, Number(req.params.id)]

  const getDiaryEntry = await diaryEntry.getDiaryEntry(params)

  console.log('Hello this single diary entry', getDiaryEntry)

  res.json(getDiaryEntry)
}

const diary_entry_list_update = async (req, res) => {
  /*   console.log('update mode', req.body)
  console.log('update mode', req.user.userId) */

  console.log('update mode', req.body, req.file)
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  try {
    let thumb, coords

    if (req.file) {
      console.log('req.file.path', req.file.path)
      console.log('req.file.filename', req.file.filename)

      console.log('thumbnails', req.file.filename)

      thumb = await makeThumbnail(
        req.file.path,
        './thumbnails/' + req.file.filename
      )

      console.log('thumb', thumb)

      if (req.file.format === 'jpeg')
        coords = await imageMeta.getCoordinates(req.file.path)

      console.log('new coords', coords)
    }

    console.log('wazis', req.file)

    const params = [
      req.body.dateTime,
      req.body.title,
      req.body.noteText,
      req.body.mood,
      req.body.things,
      req.file ? req.file.filename : undefined,
      coords ? coords.toString() : undefined,
      req.user.userId,
      req.body.dayEntryId,
    ]

    const updateDiaryEntry = await diaryEntry.updateDiaryEntry(params)

    console.log('diary_entry_update and stuff', updateDiaryEntry)
    res.json(updateDiaryEntry)
  } catch (e) {
    console.log('exif error', e)
    res.status(400).json({ message: 'error' })
  }
}

const diary_entry_post = async (req, res) => {
  console.log('post mode', req.body, req.file)
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  try {
    let thumb, coords

    if (req.file) {
      console.log('req.file.path', req.file.path)
      console.log('req.file.filename', req.file.filename)

      console.log('thumbnails', req.file.filename)

      thumb = await makeThumbnail(
        req.file.path,
        './thumbnails/' + req.file.filename
      )

      console.log('thumb', thumb)

      if (req.file.format === 'jpeg')
        coords = await imageMeta.getCoordinates(req.file.path)

      console.log('new coords', coords)
    }

    console.log('wazis', req.file)

    const params = [
      req.body.dateTime,
      req.body.title,
      req.body.noteText,
      req.body.mood,
      req.body.things,
      req.file ? req.file.filename : undefined,
      coords ? coords.toString() : undefined,
      req.user.userId,
    ]

    const postDiaryEntry = await diaryEntry.createDiaryEntry(params)

    console.log('diary_entry_post and stuff', postDiaryEntry)
    res.json(postDiaryEntry)
  } catch (e) {
    console.log('exif error', e)
    res.status(400).json({ message: 'error' })
  }
}

const diary_entry_delete = async (req, res) => {
  console.log('delete mode diary entry id', Number(req.params.id))
  console.log('delete mode user id', req.user.userId)

  const params = [req.user.userId, Number(req.params.id)]

  const postDiaryEntry = await diaryEntry.deleteDiaryEntry(params)

  console.log('diary_entry_delete and stuff', postDiaryEntry)
  res.json(postDiaryEntry)
}

const image_file_validator = (value, { req }) => {
  console.log('req.file', req.file)
  if (!req.file) {
    throw new Error('No image')
  }
  // if OK
  return true
}

module.exports = {
  diary_entry_list_get,
  diary_entry_get,
  diary_entry_post,
  diary_entry_list_update,
  diary_entry_delete,
  image_file_validator,
}
