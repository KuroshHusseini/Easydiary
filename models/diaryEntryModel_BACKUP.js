'use strict'
const promisePool = require('../database/db').promise()

const getAllUserDiaryEntry = async (params) => {
    try {
        const [rows] = await promisePool.execute(
            `SELECT Datetime, NoteText, UserID FROM Day_Entry where UserID = ?`,
            params
        )
        console.log('rows', rows)
        return rows
    } catch (err) {
        console.log('error', err.message)
    }
}

const getUserDiaryEntry = async (userID) => {
    try {
        const [rows] = await promisePool.execute(
            `SELECT * FROM Day_Entry where UserID = ?`, [userID]
        )
        console.log('rows', rows)
        return rows
    } catch (err) {
        console.log('error', err.message)
    }
}


const insertDiaryEntry = async (dayEntry) => {
    try {
        console.log("insert diary?", dayEntry)
        const [rows] =
            await promisePool.query(
                `INSERT INTO day_entry
             (DateTime, NoteText, userID) 
             VALUES
             (?, ?, ?);`, dayEntry)
        return rows
    } catch (err) {
        console.error("error", err.message)
    }
}
const updateDiaryEntry = async (dayEntry) => {
    try {
        console.log("update diary? ", dayEntry);
        const [rows] =
            await promisePool.query(
                "UPDATE day_entry " +
                "SET DateTime = ?, NoteText = ?, userID = ? " +
                "WHERE userID = ?")
    } catch (err) {
        console.error("updatediary model crash", err.message)
    }
}
const deleteDiaryEntry = async (dayEntry)=>{
    try {
        console.log("delete Diary?", dayEntry)
        const [rows] =  await promisePool.query(
            "DELETE FROM day_entry" +
                 "WHERE" +
                 "userID = ?",[dayEntry])
    }catch (err) {
    console.error("deleteDayEntry model", err.message)
    }
}

module.exports = {
    getAllUserDiaryEntry,
    deleteDiaryEntry,
    updateDiaryEntry,
    getUserDiaryEntry,
    insertDiaryEntry
}
