const CompareController = require('../src/app/controllers/CompareController')

describe('Comparing 2 products with a valid consumption value should return a product list and one of the products must have property isCheap as true', () => {
  it('Should return the first product with isCheap value as true, from 0 to 3363kWh/year', async () => {
    for (let index = 0; index <= 3363; index++) {
      const comparingProducts = await CompareController.compareProducts(index)

      expect(comparingProducts.products[0].isCheaper).toBe(true)
      expect(comparingProducts.products[1].isCheaper).toBe(false)
    }
  })

  it('Should return the second product with isCheap value as true, from 3363 to 5749kWh/year', async () => {
    for (let index = 3364; index <= 5749; index++) {
      const comparingProducts = await CompareController.compareProducts(index)

      expect(comparingProducts.products[1].isCheaper).toBe(true)
      expect(comparingProducts.products[0].isCheaper).toBe(false)
    }
  })

  it('Should return the first product with isCheap value as true, from 5750 to 10000kWh/year', async () => {
    for (let index = 5751; index <= 10000; index++) {
      const comparingProducts = await CompareController.compareProducts(index)

      expect(comparingProducts.products[0].isCheaper).toBe(true)
      expect(comparingProducts.products[1].isCheaper).toBe(false)
    }
  })
})

const errorMessage = 'is not a valid consumption value'

describe('Comparing 2 products with a invalid consumption value should return a error message', () => {
  it('Should return a error when consumption is a letter', async () => {
    const consumption = 'A'
    const comparingProducts = await CompareController.compareProducts(
      consumption
    )
    expect(comparingProducts.error).toBe(`${consumption} ${errorMessage}`)
  })

  it('Should return a error when consumption is a boolean', async () => {
    const consumption = true
    const comparingProducts = await CompareController.compareProducts(
      consumption
    )
    expect(comparingProducts.error).toBe(`${consumption} ${errorMessage}`)
  })

  it('Should return a error when consumption is a negative number', async () => {
    const consumption = -1000
    const comparingProducts = await CompareController.compareProducts(
      consumption
    )
    expect(comparingProducts.error).toBe(`${consumption} ${errorMessage}`)
  })
})

afterAll(async (done) => {
  done()
})
