'use strict'

const CalculateConsumptionController = require('./CalculateConsumptionController')

class CompareController {
  async compareProducts (req, res) {
    const { body } = req
    const { consumption = 0 } = body

    const productsList = require('../products')

    let products = productsList
      .map((product) => {
        return {
          ...product,
          annualCost: CalculateConsumptionController.calculate(
            consumption,
            product
          )
        }
      })
      .sort((a, b) => {
        a.isCheaper = Number(a.annualCost < b.annualCost)
        b.isCheaper = Number(b.annualCost < a.annualCost)
      })

    res.render('compare/index', { products, consumption })
  }
}

module.exports = new CompareController()
