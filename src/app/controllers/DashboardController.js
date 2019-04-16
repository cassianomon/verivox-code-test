class DashboardController {
  async index (req, res) {
    const products = require('../products')

    res.render('compare/index', { products })
  }
}

module.exports = new DashboardController()
