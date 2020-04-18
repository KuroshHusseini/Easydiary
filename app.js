'use strict'
require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()

// ROUTES

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// app.use ROUTES
//app.use('/cat', )

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}`)
})
