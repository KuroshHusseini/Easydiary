'use strict'
const promisePool = require('../database/db').promise()

const getAllPublicDayEntry = async (params) => {
  try {
    const [rows] = await promisePool.execute(
      `SELECT PublicDayEntryID,
             CreatedAt, 
             UpdatedAt,
             DayEntryID,
             UserID 
             FROM public_day_entry 
             WHERE
             DayEntryID = ? 
             AND 
             userID = ?`,
      params
    )
    console.log('rows', rows)
    return rows
  } catch (err) {
    console.log('error', err.message)
  }
}

const getPublicDayEntry = async (dayEntryID, userID) => {
  try {
    const [rows] = await promisePool.execute(
      `SELECT * FROM public_day_entry 
            WHERE
            DayEntryID = ? 
            AND 
            userID = ?`,
      [dayEntryID, userID]
    )
    console.log('rows', rows)
    return rows
  } catch (err) {
    console.log('error', err.message)
  }
}

const createPublicDayEntry = async (publicDayEntry) => {
  try {
    console.log('Create diary?', publicDayEntry)
    const [rows] = await promisePool.query(
      `INSERT INTO public_day_entry
             (PublicDayEntryID,
             CreatedAt,
             UpdatedAt, 
             DayEntryID, 
             UserID) 
             VALUES
             (?, ?, ?, ?, ?);`,
      publicDayEntry
    )
    return rows
  } catch (err) {
    console.error('error', err.message)
  }
}

const updatePublicDayEntry = async (publicDayEntry) => {
  try {
    console.log('update diary? ', publicDayEntry)
    const [rows] = await promisePool.query(
      'UPDATE public_day_entry' +
        'SET ' +
        'CreatedAt = ?, ' +
        'UpdatedAt = ?,' +
        'WHERE DayEntryID = ?' +
        'AND' +
        'userID = ?'
    )
  } catch (err) {
    console.error('update publicDayEntry model crash', err.message)
  }
}
const deletePublicDiaryEntry = async (entry) => {
  try {
    console.log('delete Diary?', entry)
    const [rows] = await promisePool.query(
      'DELETE ' +
        'FROM public_day_entry ' +
        'WHERE' +
        'DayEntryID = ? AND userID = ?',
      [entry]
    )
  } catch (err) {
    console.error('deletePublicDayEntry model', err.message)
  }
}

module.exports = {
  getAllPublicDayEntry,
  getPublicDayEntry,
  createPublicDayEntry,
  updatePublicDayEntry,
  deletePublicDiaryEntry,
}
