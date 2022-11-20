const express = require('express')
const routes = express.Router()

//controllers
const home = require('../controllers/home')

//routes
routes.post('/', home.login)

module.exports = routes