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
      `SELECT FName firstName,
       LName lastName,
        Sex sex,
        BirthDate birthDate,
        City city,
        StrAddress streetAddress,
        PostCode postCode,
        Country country 
        FROM user INNER JOIN location ON user.LivesID = location.LivesID;`
    )

    return rows
  } catch (e) {
    console.log('error', e.message)
    throw e
  }
}

module.exports = {
  getAllUsers,
}
