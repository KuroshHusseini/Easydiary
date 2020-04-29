'use strict'


///////////////// en oo varma täst yritin tehä jonkun verran
const promisePool = require('../database/db').promise()

const updateUserLogin = async (params) => {
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

const getSettingsState = async (id) => {
    try {
        const [rows] = await promisePool.query(
            `SELECT * FROM user
                FName firstName = ?,
                LName lastName = ?,
                Sex sex = ?,
                BirthDate birthDate = ?,
                City city = ?,
                StrAddress streetAddress = ?,
                PostCode postCode = ?,
                Country country = ?`,
            id
        )
        console.log('rows', rows)
        return rows
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
    updateUserLogin,
    getSettingsState,
    deleteUser
}
