const express = require('express')
const routes = express.Router()

const CompareController = require('./app/controllers/CompareController')
const DashboardController = require('./app/controllers/DashboardController')

routes.get('/', DashboardController.index)

routes.post('/compare', CompareController.compareProducts)

module.exports = routes
