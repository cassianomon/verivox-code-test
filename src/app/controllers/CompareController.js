'use strict'

const CalculateConsumptionController = require('./CalculateConsumptionController')

class CompareController {
  constructor () {
    this.compareProducts = this.compareProducts.bind(this)
    this.render = this.render.bind(this)
  }

  async compareProducts (consumption) {
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
        a.isCheaper = parseFloat(a.annualCost) < parseFloat(b.annualCost)
        b.isCheaper = parseFloat(b.annualCost) < parseFloat(a.annualCost)
      })

    return {
      products,
      consumption
    }
  }

  render (req, res) {
    const { body } = req
    const { consumption = 0 } = body

    this.compareProducts(consumption).then(({ products, consumption }) => {
      res.render('compare/index', { products, consumption })
    })
  }
}

module.exports = new CompareController()
