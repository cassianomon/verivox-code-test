'use strict'

class CompareController {
  constructor () {
    this.compareProducts = this.compareProducts.bind(this)
    this.calculate = this.calculate.bind(this)
    this.render = this.render.bind(this)
  }

  async compareProducts (consumption) {
    const productsList = require('../products')

    let products = productsList
      .map((product) => {
        return {
          ...product,
          annualCost: this.calculate(consumption, product)
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

  calculate (consumption, product) {
    const range = product.prices.filter(({ range: [min, max] }) => {
      return min <= consumption && consumption <= max
    })

    const prices = range.map(({ calc }) => {
      return calc(consumption)
    })

    const result = Math.min(...prices)

    return result.toFixed(2)
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
