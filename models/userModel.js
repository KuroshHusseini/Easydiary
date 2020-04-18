'use strict'
const promisePool = require('../database/db').promise()
/* const getUserLogin = async(params)
try {
  console.log('params')
  const [rows] = await pool.execute(
    'SELECT * FROM user WHERE
    )
} */

const getAllUsers = async () => {
  try {
    const [rows] = await promisePool.query(
      'SELECT u.FName firstName, u.LName, l.StrAddress, l.City FROM location l, user u;'
    )
    /*     const [rows] = await pool.query(
      'SELECT u.FName, u.LName, l.StrAddress, l.City FROM location l, user u;'
    ) */
    return rows
  } catch (e) {
    console.log('error', e.message)
    throw e
  }
}

module.exports = {
  getAllUsers,
}
