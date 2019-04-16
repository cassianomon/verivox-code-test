module.exports = [
  {
    name: 'Basic Electricity Tariff',
    description: '5€/Month plus 0.22€/kWh',
    info: '',
    slug: 'basic-electricity-tariff',
    prices: [
      {
        range: [0, Infinity],
        calc: (kWh) => 60 + 0.22 * kWh
      }
    ]
  },
  {
    name: 'Packaged Tariff',
    description: '800€/Year',
    info: 'above 4000 kWh, increases by 0.30€/kWh',
    slug: 'packaged-tariff',
    prices: [
      {
        range: [0, 4000],
        calc: () => 800
      },
      {
        range: [4000, Infinity],
        calc: (kWh) => 800 + 0.3 * (kWh - 4000)
      }
    ]
  }
]
