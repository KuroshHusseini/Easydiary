'use strict'

///////////////// en oo varma täst yritin tehä jonkun verran
const promisePool = require('../database/db').promise()

/* const updateUserLogin = async (params) => {
  try {
    console.log('user params', params)
    const [rows] = await promisePool.execute(
      'UPDATE user' +
        'SET' +
        'Email = ?' +
        'email = ?, ' +
        'Username username = ?, ' +
        'Password password = ?, ' +
        'UserID userId = ? ' +
        'WHERE' +
        ' user = ? ' +
        'AND' +
        ' Email = ?;',
      params
    )

    console.log('rows', rows)
    return rows
  } catch (e) {
    console.log('error', e.message)
  }
} */

const updateUserSettings = async (params) => {
  /* UPDATE t1
INNER JOIN t2 ON t2.t1_id = t1.id
INNER JOIN t3 ON t2.t3_id = t3.id
SET t1.a = 'something',
    t2.b = 42,
    t3.c = t2.c
WHERE t1.a = 'blah'; */
  try {
    console.log('settings user update params', params)
    const [rows] = await promisePool.query(
      `UPDATE user 
      INNER JOIN location ON location.LivesID = user.LivesID 
      SET location.StrAddress = ?, location.City = ?,
        location.PostCode = ?,
        user.FName = ?,
        user.LName = ?
        WHERE UserID = ?`,
      params
    )
    console.log('rows', rows)
    return rows
  } catch (e) {
    console.log('error', e.message)
  }
}

const updateUserPassword = async (params) => {
  try {
    console.log('settings user password update params', params)
    const [rows] = await promisePool.query(
      `UPDATE user SET Password = ? WHERE UserID = ?;`,
      params
    )
    console.log('rows', rows)
    return rows
  } catch (e) {
    console.log('error', e.message)
  }
}

const updateAllUsers = async () => {
  try {
    const [rows] = await promisePool.query(
      `UPDATE user
                SET
                FName firstName = ?,
                LName lastName = ?,
                Sex sex = ?,
                BirthDate birthDate = ?,
                City city = ?,
                StrAddress streetAddress = ?,
                PostCode postCode = ?,
                Country country = ? 
                FROM 
                user`
    )
    return rows
  } catch (e) {
    console.log('error', e.message)
    throw e
  }
}

const getUserSettings = async (id) => {
  try {
    const [rows] = await promisePool.query(
      `SELECT 
      StrAddress strAddress,
      City city,
      PostCode postCode,
      FName firstName,
      LName lastName   
      FROM user 
      INNER JOIN
      location
      ON user.LivesID = location.LivesID WHERE UserID = ?;`,
      id
    )
    console.log('rows', rows)
    return rows[0]
  } catch (e) {
    console.log('error', e.message)
    throw e
  }
}

const deleteUser = async (id) => {
  try {
    console.log('delete User', id)
    const [rows] = await promisePool.query(
      `DELETE FROM user WHERE UserID = ?`,
      id
    )
    return rows
  } catch (err) {
    console.error('deleteUser model', err.message)
  }
}

module.exports = {
  updateAllUsers,
  updateUserSettings,
  updateUserPassword,
  getUserSettings,
  deleteUser,
}
