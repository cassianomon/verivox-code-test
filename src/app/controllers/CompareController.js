'use strict'

class CompareController {
  constructor () {
    // Binding functions so I can use `this`
    this.compareProducts = this.compareProducts.bind(this)
    this.calculate = this.calculate.bind(this)
    this.isValid = this.isValid.bind(this)
    this.render = this.render.bind(this)
  }

  isValid (consumption) {
    // If consumption value is true to `isNaN()` comparision (it's not a number)
    // or if it's of type `boolean``
    // or if it's above 0 it will return false, so it's not valid

    return !(
      Number.isNaN(Number(consumption)) ||
      typeof consumption === 'boolean' ||
      consumption < 0
    )
  }

  async compareProducts (consumption) {
    // Gets the product list from `products.js`
    const productsList = require('../products')

    if (!this.isValid(consumption)) {
      // If it's not a valid number for calculate, it will return a error to display in the front-end
      return {
        products: productsList,
        consumption,
        error: `${consumption} is not a valid consumption value`
      }
    }

    let products = productsList
      .map((product) => {
        // Iterate the product with it's own properties, plus the annual cost
        return {
          ...product,
          annualCost: this.calculate(consumption, product)
        }
      })
      .sort((a, b) => {
        // Compare which product is cheaper
        a.isCheaper = parseFloat(a.annualCost) < parseFloat(b.annualCost)
        b.isCheaper = parseFloat(b.annualCost) < parseFloat(a.annualCost)
      })

    // If everything is calculated, it returns the product list and consumption value to the `render` method

    return {
      products,
      consumption
    }
  }

  calculate (consumption, product) {
    // The `range` constnt will receive the price range which the consumption is between
    const range = product.prices.filter(({ range: [min, max] }) => {
      return min <= consumption && consumption <= max
    })

    // The `prices` constant will receive the calculation that is already a property of the product based on the range it's between
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
        // Result will render the view with the products with annual cost if it's a valid consumption, the consumption value and the error
        res.render('compare/index', { products, consumption, error })
      }
    )
  }
}

module.exports = new CompareController()
