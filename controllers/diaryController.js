'use strict'

const diaryEntry = require('../models/diaryEntry')

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
  console.log('update mode', req.body)
  console.log('update mode', req.user.userId)
  const params = [
    req.body.dateTime,
    req.body.title,
    req.body.noteText,
    req.body.mood,
    req.body.things,
    req.body.filename,
    req.user.userId,
    req.body.dayEntryId,
  ]

  const updateDiaryEntry = await diaryEntry.updateDiaryEntry(params)

  console.log('updatedDiary', updateDiaryEntry)
  res.json(updateDiaryEntry)
}

const diary_entry_post = async (req, res) => {
  console.log('post mode', req.body)
  console.log('post mode', req.user.userId)

  const params = [
    req.body.dateTime,
    req.body.title,
    req.body.noteText,
    req.body.mood,
    req.body.things,
    req.body.filename,
    req.user.userId,
  ]

  const postDiaryEntry = await diaryEntry.createDiaryEntry(params)

  console.log('diary_entry_post and stuff', postDiaryEntry)
  res.json(postDiaryEntry)
}

const diary_entry_delete = async (req, res) => {
  console.log('update mode diary entry id', Number(req.params.id))
  console.log('update mode user id', req.user.userId)

  const params = [req.user.userId, Number(req.params.id)]

  const postDiaryEntry = await diaryEntry.deleteDiaryEntry(params)

  console.log('diary_entry_delete and stuff', postDiaryEntry)
  res.json(postDiaryEntry)
}

module.exports = {
  diary_entry_list_get,
  diary_entry_get,
  diary_entry_post,
  diary_entry_list_update,
  diary_entry_delete,
}
/*   res.json({
    message: 'You made it to the diary entry route',
    user: req.user,
    token: req.get('Authorization'),
  }) */

/*   const diaryEntries = await diaryEntry.getAllDiaryEntries(req.body.id)
  res.json(diaryEntries) */
