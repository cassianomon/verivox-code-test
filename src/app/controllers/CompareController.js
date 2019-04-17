'use strict'

class CompareController {
  constructor () {
    this.compareProducts = this.compareProducts.bind(this)
    this.calculate = this.calculate.bind(this)
    this.isValid = this.isValid.bind(this)
    this.render = this.render.bind(this)
  }

  isValid (consumption) {
    return !(
      Number.isNaN(Number(consumption)) ||
      typeof consumption === 'boolean' ||
      consumption < 0
    )
  }

  async compareProducts (consumption) {
    const productsList = require('../products')

    if (!this.isValid(consumption)) {
      return {
        products: productsList,
        consumption,
        error: `${consumption} is not a valid consumption value`
      }
    }

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

    this.compareProducts(consumption).then(
      ({ products, consumption, error = null }) => {
        res.render('compare/index', { products, consumption, error })
      }
    )
  }
}

module.exports = new CompareController()
