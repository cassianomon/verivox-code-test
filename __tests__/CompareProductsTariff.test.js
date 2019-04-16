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

afterAll(async (done) => {
  done()
})
