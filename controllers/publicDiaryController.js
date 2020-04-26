'use strict'
const publicDiaryEntryModel = require('../models/publicDiaryEntryModel')
const { validationResult } = require('express-validator')

const publicDiaryEntry = publicDiaryEntryModel.publicDiary

const publicDiaryEntry_list_get = async (req, res) => {
  const publicDiaries = await publicDiaryEntryModel.getAllPublicDayEntry()
  res.json(publicDiaries)
}

const publicDiary_get = async (req, res) => {
  console.log('Public diary id parameter', req.params)
  const publicDiary = await publicDiaryEntryModel(req.params.id)
  res.json(publicDiary)
}

const publicDiary_post = async (req, res) => {
  console.log('PublicDiary_post', req.body, req.file)
  let errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  try {
    const publicDiary = await diaryEntryModel.insertDiaryEntry(req.body)
    console.log('inserted', user)
    res.send(`added public diary: ${publicDiary.userId}`)
  } catch (err) {
    console.error('problem with publicDiary_post in diaryEntryController', err)
    res.status(500).send(`database insert error: ${err.message}`)
  }
}

const publicDiary_put = async (res, req) => {
  console.log('publicDiary_put', req.body)
  let error = validationResult(req)
  if (!error.isEmpty()) {
    return res.status(422).json({ errors: error.array() })
  }
  const upPublicDiary = await publicDiaryEntryModel.updatePublicDayEntry(
    req.body
  )
  console.log('publicDiary_put result from db', upPublicDiary)
  res.status(204).send()
}

const publicDiary_delete = async (req, res) => {
  console.log('publicDiary_put', req.params)
  const delePublicDiary = await publicDiaryEntryModel.deletePublicDiaryEntry(
    req.params.id
  )
  console.log('publicDiary_delete result from db', delePublicDiary)
  res.json({ deleted: 'OK' })
}

module.exports = {
  publicDiary_delete,
  publicDiary_put,
  publicDiary_post,
  publicDiary_get,
  publicDiaryEntry_list_get,
}
