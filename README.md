# GDAX Public API (Node)

[![Build Status](https://travis-ci.org/ReyHaynes/exchange-gdax-public-api.svg?branch=master)](https://travis-ci.org/ReyHaynes/exchange-gdax-public-api)

This package interacts with the public REST API endpoints for the GDAX Exchange that require no authentication using `Promises`.

With this package, you should be able to get access to:
* Cryptocurrency Pair Quotes
* Market Metadata
* 24-Hour Market Summary
* Order Flow & Market History
* Candlestick Data

API requiring authentication has been decoupled, and will be created in an additional package as an add-on.

## Installation

`exchange-gdax-public-api` is available from npm and yarn:

```
npm install exchange-gdax-public-api

- or -

yarn add exchange-gdax-public-api
```

## Usage

### Getting Started

1. `require()` or `import` module:
```
const GDAX = require('exchange-gdax-public-api')
```
or
```
import GDAX from 'exchange-gdax-public-api'
```

- Create a new GDAX `Object`:
```
const gdax = new GDAX()
```

- Use any method needed to get the desired data.
All methods return a promise so you can use `await/async` with `try {} catch() {}` or `.then().catch()`

### Responses

Responses should return a `success` and `result` property. Successful responses from the API should return as `true`.

```
{
  "success": true,  // @bool
  "result": <data>  // @array or @object
}
```

### Methods Available

| Method | Description |
| -- | -- |
| `getMarkets()` | Get a list of available currency pairs for trading. |
| `getOrderBook(pair, level)` | Get a list of open orders for a product. The amount of detail shown can be customized with the level parameter.<li>`pair` - `@string` Market Pair (ex: LTC-BTC)</li><li>`pair` - `level` - `@number` Control level of detail to include. 3-Levels max.</li> |
| `getTicker(pair)` | Snapshot information about the last trade (tick), best bid/ask and 24h volume.<li>`pair` - `@string` Market Pair (ex: LTC-BTC)</li> |
| `getMarketHistory(pair, query)` | List the latest trades for a product.<li>`pair` - `@string` Market Pair (ex: LTC-BTC)</li><li>`query` - `@object` - Response is paginated. Control properties go here.<ul><li>`before`: `@number` - Request page before (newer) this pagination id.</li><li>`after`: `@number` - Request page after (older) this pagination id.</li><li>`limit`: `@number` - Number of results per request. Maximum 100. (default 100)</li></ul></li> |
| `getHistoricCandles(pair, query)` | Historic rates for a product. Rates are returned in grouped buckets based on requested granularity.<li>`pair` - `@string` Market Pair (ex: LTC-BTC)</li><li>`query` - `@object` - Response has additional controls to customize.<ul><li>`start`: `@number` - Start time in ISO 8601 (Multiply by 1000 for UNIX)</li><li>`end`: `@number` - End time in ISO 8601 (Multiply by 1000 for UNIX)</li><li>`granularity`: `@number` - Desired timeslice in seconds. (Ex: 300 = 5min)</li></ul></li> |
| `getMarketSummary(pair)` | Get 24 hr stats for the product. volume is in base currency units. open, high, low are in quote currency units.<li>`pair` - `@string` Market Pair (ex: LTC-BTC)</li> |
| `getCurrencies()` | List known currencies. |
| `getEndpoint(path, query)` | Used to get any additional endpoint that might get added in the future.<li>`path` - `@string` Custom path to an endpoint (ex: `/products`)</li><li>`query` - `@object` Custom parameters to include (ex: `{ granularity: 300 }`)</li> |

### Contribute

Please...if you find any issues or improvements needed, feel free to submit your improvements!
