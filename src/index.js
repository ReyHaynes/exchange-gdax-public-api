import "babel-polyfill"
import axios from 'axios'
import querystring from 'querystring'

export default class GDAXPublicAPI {
  /* istanbul ignore next */
  constructor({ baseURL } = { baseURL: 'https://api.gdax.com' }) {
    this.api = axios.create({ baseURL })
  }

  getMarkets() {
    return getRequest({
      api: this.api,
      path: '/products'
    })
  }

  getOrderBook(pair, level=1) {
    return getRequest({
      api: this.api,
      path: '/products/'+pair+'/book',
      query: { level }
    })
  }

  getTicker(pair) {
    return getRequest({
      api: this.api,
      path: '/products/'+pair+'/ticker'
    })
  }

  getMarketHistory(pair, query = { limit: 100 }) {
    return getRequest({
      api: this.api,
      path: '/products/'+pair+'/trades',
      query
    })
  }

  getHistoricCandles(pair, query = {}) {
    return getRequest({
      api: this.api,
      path: '/products/'+pair+'/candles',
      query
    })
  }

  getMarketSummary(pair) {
    return getRequest({
      api: this.api,
      path: '/products/'+pair+'/stats'
    })
  }

  getCurrencies() {
    return getRequest({
      api: this.api,
      path: '/currencies'
    })
  }

  getEndpoint(path, query = {}) {
    return getRequest({
      api: this.api,
      path,
      query
    })
  }
}

/*
 *  Private Function(s)
 * * * * */

/* istanbul ignore next */
async function getRequest({ api, path, query = {} }) {
  try {
    const { data } = await api.get(path + '?' + querystring.stringify(query))
    return {
      success: true,
      result: data
    }
  } catch ({ response }) {
    return {
      success: false,
      result: response.data
    }
  }
}
