# vestedEquityCalculator

## About 🧮

vestedEquityCalculator is a microservice that, given a set of option grants with vesting information, returns the total value of vested options by using one (or multiple) valuations. For this microservice, it is assumed that (the first) valuation is executed before a grant is awarded.

## How to get vestedEquityCalculator up and running 🚀
1. Choose your directory of choice and make sure to `cd` into it
2. Clone the secfi repository running `git clone <SSH || HTTPS>`
3. Now, navigate into the secfi directory and run `npm ci` to install the dependencies
4. Run the service with `wrangler dev`
5. You can choose to run the service locally with Cloudflare's built-in local simulator (Miniflare) by pressing `l`
6. You can also choose to run the service on a browser by pressing `b`
7. Great! You're up and running! 

## How to send requests to vestedEquityCalculator ➡️
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/a9d44dcd10a3857f63f4?action=collection%2Fimport)
