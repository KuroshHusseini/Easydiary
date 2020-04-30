'use strict'
const promisePool = require('../database/db').promise()

const getAllPublicDayEntry = async (params) => {
  try {
    const [rows] = await promisePool.execute(
      `SELECT Username username,
                  Title title,
                  NoteText noteText,
                  Filename filename,
                  DateTime dateTime,
                  Things things,
                  Mood mood,
                  public_day_entry.DayEntryId dayEntryId
                  FROM public_day_entry
                  INNER JOIN day_entry ON public_day_entry.DayEntryID = day_entry.DayEntryID
                  INNER JOIN user ON day_entry.UserID = user.userID;`,
      params
    )
    console.log('rows', rows)
    return rows
  } catch (err) {
    console.log('error', err.message)
  }
}

const selectBySearch = async (search) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT DateTime dateTime, Title title, NoteText noteText, Mood mood, Things things, Filename filename, Coords coords, day_entry.DayEntryID dayEntryId FROM public_day_entry INNER JOIN day_entry ON public_day_entry.DayEntryID = day_entry.DayEntryID WHERE Title LIKE ?',
      '%' + search + '%'
    )
    console.log('rows', rows)
    return rows
  } catch (err) {
    console.log('error', err.message)
  }
}
/*   try {
    const [rows] = await promisePool.execute(
      `SELECT Username username,
       Title title,
       NoteText noteText,
       Filename filename,
       DateTime dateTime,
       Things things,
       Mood mood
        FROM public_day_entry
          INNER JOIN day_entry ON public_day_entry.DayEntryID = day_entry.DayEntryID
          INNER JOIN user ON day_entry.UserID = user.userID;`,
      params
    )
    console.log('rows', rows)
    return rows
  } catch (err) {
    console.log('error', err.message)
  }
} */
/* const getAllPublicDayEntry = async (params) => {
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
} */

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

const createPublicDayEntry = async (params) => {
  try {
    console.log('create public diary?', params)
    const [rows] = await promisePool.query(
      `INSERT INTO public_day_entry
            (CreatedAt,
             UpdatedAt, 
             DayEntryID, 
             UserID) 
             VALUES
             (?, ?, ?, ?);`,
      params
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
const deletePublicDiaryEntry = async (params) => {
  try {
    console.log('delete Diary?', params)
    const [rows] = await promisePool.query(
      `DELETE FROM public_day_entry WHERE UserID = ? AND DayEntryID = ?;`,
      params
    )
    return rows
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
  selectBySearch,
}
