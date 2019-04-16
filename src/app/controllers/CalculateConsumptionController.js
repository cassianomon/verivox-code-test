'use strict'

class CalculateConsumptionController {
  calculate (consumption, product) {
    const range = product.prices.filter(({ range: [min, max] }) => {
      return min <= consumption && consumption <= max
    })

    const prices = range.map(({ calc }) => {
      return calc(consumption)
    })

    const calculated = Math.min(...prices)

    return calculated.toFixed(2)
  }
}

module.exports = new CalculateConsumptionController()
