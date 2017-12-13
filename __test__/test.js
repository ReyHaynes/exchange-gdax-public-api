import { expect } from 'chai'
import GDAX from '../src'

const gdax = new GDAX()

const WAITTIME = 1000

/* istanbul ignore next */
const mochaAsync = (fn) => {
  return (done) => {
    fn.call().then(done, (e) => {
      done(e)
    })
  }
}

describe(`# GDAX Public API Test (${WAITTIME}ms wait per test)`, function() {
  afterEach(function(done) {
    this.timeout(WAITTIME * 1.1)
    setTimeout(() => {
      done()
    }, WAITTIME)
  })

  it("Can get products: getMarkets()",
    mochaAsync(async () => {
      const { success, result } = await gdax.getMarkets()

      expect(success).to.be.equal(true)
      expect(result).to.be.an('array')
      expect(result.length).to.be.above(0)
    })
  )

  it("Can get currencies: getCurrencies()",
    mochaAsync(async () => {
      const { success, result } = await gdax.getCurrencies()

      expect(success).to.be.equal(true)
      expect(result).to.be.an('array')
      expect(result.length).to.be.above(0)
    })
  )

  it("Can get LTC-BTC pair order book: getOrderBook(pair, level)",
    mochaAsync(async () => {
      const { success, result } = await gdax.getOrderBook('LTC-BTC', 2)

      expect(success).to.be.equal(true)
      expect(result).to.be.an('object')
    })
  )

  it("Can get ticker LTC-BTC pair: getTicker(pair)",
    mochaAsync(async () => {
      const { success, result } = await gdax.getTicker('LTC-BTC')

      expect(success).to.be.equal(true)
      expect(result).to.be.an('object')
    })
  )

  it("Can get LTC-BTC pair market history: getMarketHistory(pair, query)",
    mochaAsync(async () => {
      const { success, result } = await gdax.getMarketHistory('LTC-BTC', { limit: 10 })

      expect(success).to.be.equal(true)
      expect(result).to.be.an('array')
      expect(result.length).to.be.above(0)
    })
  )

  it("Can get LTC-BTC pair historic 5-minute candles: getHistoricCandles(pair, query)",
    mochaAsync(async () => {
      const { success, result } = await gdax.getHistoricCandles('LTC-BTC', { granularity: 300 })

      expect(success).to.be.equal(true)
      expect(result).to.be.an('array')
      expect(result.length).to.be.above(0)
    })
  )

  it("Can get LTC-BTC pair market summary: getMarketSummary(pair)",
    mochaAsync(async () => {
      const { success, result } = await gdax.getMarketSummary('LTC-BTC')

      expect(success).to.be.equal(true)
      expect(result).to.be.an('object')
    })
  )

  it("Can get products using explicit endpoint '/products': getEndpoint(path, query)",
    mochaAsync(async () => {
      const { success, result } = await gdax.getEndpoint('/products')

      expect(success).to.be.equal(true)
      expect(result).to.be.an('array')
      expect(result.length).to.be.above(0)
    })
  )

  it("Cannot get non-existent or errored endpoint '/prod': getEndpoint(path, query)",
    mochaAsync(async () => {
      const { success } = await gdax.getEndpoint('/prod')

      expect(success).to.be.equal(false)
    })
  )
})
