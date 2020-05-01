'use strict'
const settingsModel = require('../models/settingsModel')
const userModel = require('../models/userModel')

const bcrypt = require('bcryptjs')

const settings_state_get = async (req, res) => {
  const settingsState = await settingsModel.getUserSettings(req.user.userId)

  res.json(settingsState)
}

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

const settings_update_password = async (req, res) => {
  const { oldPwd, newPwd, retypePwd } = req.body

  const [user] = await userModel.getUserLogin(req.user.email)

  if (!bcrypt.compareSync(oldPwd, user.password)) {
    return res.json({ error: 'Incorrect password.' })
  }

  if (newPwd !== retypePwd) {
    return res.json({ error: 'New password does not match.' })
  }

  const saltRounds = 12
  const passwordHash = await bcrypt.hash(newPwd, saltRounds)

  const params = [passwordHash, req.user.userId]

  const updatedPassword = await settingsModel.updateUserPassword(params)

  res.json(updatedPassword)
}

const delete_user = async (req, res) => {
  const deleteUser = await settingsModel.deleteUser(req.user.userId)

  res.json(deleteUser)
}

module.exports = {
  settings_state_get,
  settings_update,
  settings_update_password,
  delete_user,
}
