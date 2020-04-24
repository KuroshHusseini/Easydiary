'use strict'
const promisePool = require('../database/db').promise()

const getAllDiaryEntries = async (id) => {
  try {
    const [rows] = await promisePool.query(
      `SELECT DateTime dateTime, NoteText noteText, Filename fileName, DayEntryID dayEntryId FROM day_entry WHERE UserID = ?`,
      id
    )
    return rows
  } catch (e) {
    console.log('error', e.message)
    throw e
  }
}

const getDiaryEntry = async (params) => {
  try {
    console.log('getDiaryEntry', params)
    const [rows] = await promisePool.execute(
      `SELECT * FROM day_entry WHERE UserID = ? AND DayEntryID = ?`,
      params
    )
    console.log('rows', rows)
    return rows
  } catch (err) {
    console.log('error', err.message)
  }
}

const createDiaryEntry = async (params) => {
  try {
    console.log('insert diary?', params)
    const [rows] = await promisePool.query(
      `INSERT INTO day_entry(DateTime, NoteText, Filename, UserID) VALUES (?, ?, ?, ?);`,
      params
    )
    return rows
  } catch (err) {
    console.error('error', err.message)
  }
}
const updateDiaryEntry = async (params) => {
  try {
    console.log('update diary? ', params)
    const [rows] = await promisePool.query(
      `UPDATE day_entry SET DateTime = ?, NoteText = ?, Filename = ? WHERE UserID = ? AND DayEntryID = ?`,
      params
    )
    return rows
  } catch (err) {
    console.error('updatediary model crash', err.message)
  }
}
const deleteDiaryEntry = async (params) => {
  try {
    console.log('delete Diary?', params)
    const [rows] = await promisePool.query(
      `DELETE FROM day_entry WHERE UserID = ? AND DayEntryID = ?;`,
      params
    )
    return rows
  } catch (err) {
    console.error('deleteDayEntry model', err.message)
  }
}

module.exports = {
  getAllDiaryEntries,
  deleteDiaryEntry,
  updateDiaryEntry,
  getDiaryEntry,
  createDiaryEntry,
}
