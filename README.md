# GDAX Public API (Node)

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

- `.getMarkets()` - Get a list of available currency pairs for trading.

- `getOrderBook(pair, level)` - Get a list of open orders for a product. The amount of detail shown can be customized with the level parameter.
  - `pair` - `@string` Market Pair (ex: LTC-BTC)
  - `level` - `@number` Control level of detail to include. 3-Levels max.

- `getTicker(pair)` - Snapshot information about the last trade (tick), best bid/ask and 24h volume.
  - `pair` - `@string` Market Pair (ex: LTC-BTC)

- `getMarketHistory(pair, query)` - List the latest trades for a product.
  - `pair` - `@string` Market Pair (ex: LTC-BTC)
  - `query` - `@object` - Response is paginated. Control properties go here.
    - `before`: `@number` - Request page before (newer) this pagination id.
    - `after`: `@number` - Request page after (older) this pagination id.
    - `limit`: `@number` - Number of results per request. Maximum 100. (default 100)

- `getHistoricCandles(pair, query)` - Historic rates for a product. Rates are returned in grouped buckets based on requested granularity.
  - `pair` - `@string` Market Pair (ex: LTC-BTC)
  - `query` - `@object` - Response has additional controls to customize.
    - `start`: `@number` - Start time in ISO 8601 (Multiply by 1000 for UNIX)
    - `end`: `@number` - End time in ISO 8601 (Multiply by 1000 for UNIX)
    - `granularity`: `@number` - Desired timeslice in seconds. (Ex: 300 = 5min)

- `getMarketSummary(pair)` - Get 24 hr stats for the product. volume is in base currency units. open, high, low are in quote currency units.
  - `pair` - `@string` Market Pair (ex: LTC-BTC)

- `getCurrencies()` - List known currencies.

- `getEndpoint(path, query)` - Used to get any additional endpoint that might get added in the future.
  - `path` - `@string` Custom path to an endpoint (ex: `/products`)
  - `query` - `@object` Custom parameters to include (ex: `{ granularity: 300 }`)

### Contribute

Please...if you find any issues or improvements needed, feel free to submit your improvements!
