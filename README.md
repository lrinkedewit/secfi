# vestedEquityCalculator

## About 🧮

**vestedEquityCalculator** is a microservice that, given a set of option grants with vesting information, returns the total value of vested options by using one (or multiple) valuations. For this microservice, it is assumed that (the first) valuation is executed before a grant is awarded.

## How to get **vestedEquityCalculator** up and running 🚀
### Running the repo on your machine
1. Choose your directory of choice and make sure to `cd` into it
2. Clone the secfi repository running `git clone <SSH || HTTPS>`
3. Now, navigate into the secfi directory and run `npm ci` to install the dependencies
4. Run the service with `wrangler dev`
5. You can choose to run the service locally with Cloudflare's built-in local simulator (Miniflare) by pressing `l`
6. You can also choose to run the service on a browser by pressing `b`
7. Great! You're up and running! 

### Querying the deployed service
1. Alternatively, you can hit the following endpoint `https://secfi.leonoorrinkedewit.workers.dev` without cloning the repository
2. Make sure to send a request with the following format: 

```ts
{
  "option_grants": [
    {
      "quantity": 4800,
      "start_date": "01-01-2018",
      "cliff_months": 12,
      "duration_months": 48
    }
  ],
  "company_valuations": [
    {
      "price": 10,
      "valuation_date": "09-12-2017"
    }
  ]
}
```
3. I recommend using Postman as an easy way to play around with **vestedEquityCalculator**

## How to send requests to **vestedEquityCalculator** ➡️
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/a9d44dcd10a3857f63f4?action=collection%2Fimport)
For ease of use, I created a few sample requests in Postman. These can be used by clicking the link above. Make sure you have a Postman account. Play around with the requests! For instance, you can change the cliff to 6 months, 13 months, or 0 months. Furthermore, you can add multiple valuation dates & prices.

## How does it work in broad strokes? ⚡️
**vestedEquityCalculator** is written in TypeScript and is deployed to a worker on Cloudflare. Workers on Cloudflare work similarly to lambdas in AWS but with the benefit that they don't have cold starts. To learn more, check out the [docs](https://developers.cloudflare.com/workers/)

