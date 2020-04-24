'use strict';
const diaryEntryModel = require("../models/diaryEntryModel")
const {validationResult} = require('express-validator');

const diaryEntry = diaryEntryModel.diary;

const diaryEntry_list_get = async (req, res) => {
    const diaries = await diaryEntryModel.getAllUserDiaryEntry();
    res.json(diaries);
}
const diary_get = async (req, res) => {
    console.log("diary id parameter", req.params)
    const diary = await diaryEntryModel(req.params.id)
    res.json(diary)
}
const diary_post = async (req, res) => {
    console.log("diary_post", req.body, req.file)
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }

    try {
        const diary = await diaryEntryModel.insertDiaryEntry(req.body)
        console.log('inserted', user)
        res.send(`added diary: ${diary.userId}`)
    } catch (err) {
        console.error('problem with diary_post in diaryEntryController', err)
        res.status(500).send(`database insert error: ${err.message}`)
    }
}

const diary_put = async (res, req) => {
    console.log("diary_put", req.body)
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(422).json({errors: error.array()});
    }
    const updiary = await diaryEntryModel.updateDiaryEntry(req.body);
    console.log('cat_put result from db', updiary);
    res.status(204).send();
}
const diary_delete = async (req, res) => {
    console.log('diary_put', req.parms);
    const delediary = await diaryEntryModel.deleteDiaryEntry(req.params.id);
    console.log('cat_delete result from db', delediary);
    res.json({deleted: 'OK'});
}
module.exports = {
    diaryEntry_list_get,
    diary_get,
    diary_post,
    diary_put,
    diary_delete,

};
