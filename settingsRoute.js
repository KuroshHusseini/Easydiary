'use strict'

const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');

router.get('/', settingsController.settings_state_get)

router.put('/', settingsController.settings_update)

router.delete('/:id', settingsController.delete_user)

module.exports = router