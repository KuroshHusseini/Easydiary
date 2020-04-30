'use strict'
const settingsModel = require('../models/settingsModel')

const settings_state_get = async (req, res) => {
  const settingsState = await settingsModel.getUserSettings(req.user.userId)

  res.json(settingsState)
}

/* const settings_update = async (req, res) => {
  console.log('update settings', req.body)
  const params = [
    req.body.firstName,
    req.body.lastName,
    req.body.sex,
    req.body.birthDate,
    req.body.city,
    req.body.streetAddress,
    req.body.postCode,
    req.body.country,
  ]

  const updateSettings = await settingsModel.updateAllUsers(params)

  res.json(updateSettings)
} */

const settings_update = async (req, res) => {
  console.log('update settings', req.body)
  const params = [
    req.body.strAddress,
    req.body.city,
    req.body.postCode,
    req.body.firstName,
    req.body.lastName,
    req.user.userId,
  ]

  const updateSettings = await settingsModel.updateUserSettings(params)

  res.json(updateSettings)
}

const delete_user = async (req, res) => {
  const deleteUser = await settingsModel.deleteUser(req.user.userId)

  res.json(deleteUser)
}

module.exports = {
  settings_state_get,
  settings_update,
  delete_user,
}
