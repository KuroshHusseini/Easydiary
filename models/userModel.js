'use strict'
const promisePool = require('../database/db').promise()

const getUserLogin = async (params) => {
  try {
    console.log('params')
    const [rows] = await promisePool.execute(
      'SELECT Email email, Username username, Password password FROM user WHERE Email = ?;',
      params
    )

    console.log('rows', rows)
    return rows
  } catch (e) {
    console.log('error', e.message)
  }
}

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

const insertUser = async (user) => {
  try {
    /*     const [rows] = await promisePool.query(
      `INSERT INTO location (City, StrAddress, PostCode, Country) VALUES("Helsinki", "Katuoja 3", "0421", "Finland"); INSERT INTO user (FName, LName, Sex, Email, Username, Password, BirthDate, LivesID) VALUES ("Michael", "Lock", "male", "michalo@metropolai.fi", "angelo", "Asiat123", "21.05.2020", LAST_INSERT_ID());`
    ) */
    const [
      rows,
    ] = await promisePool.query(
      `INSERT INTO location (City, StrAddress, PostCode, Country) VALUES(?, ?, ?, ?); INSERT INTO user (FName, LName, Sex, Email, Username, Password, BirthDate, LivesID) VALUES (?, ?, ?, ?, ?, ?, ?, LAST_INSERT_ID());`,
      [
        user.city,
        user.strAddress,
        user.postCode,
        user.country,
        user.firstName,
        user.lastName,
        user.sex,
        user.email,
        user.username,
        user.password,
        user.birthDate,
      ]
    )
    return rows
  } catch (err) {
    throw err
  }
}

module.exports = {
  getAllUsers,
  insertUser,
  getUserLogin,
}
