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
**vestedEquityCalculator** is written in TypeScript and is deployed to a worker on Cloudflare's global cloud network. Workers on Cloudflare work similarly to lambdas in AWS but with the benefit that they don't have cold starts. To learn more, check out the [docs](https://developers.cloudflare.com/workers/).

When **vestedEquityCalculator** receives a POST request, it invokes the main function `vestedEquityCalculator`. This function invokes a few helper functions passing on a message storing values that are used for calculations. 

### NOTE
I had great fun designing this service, however, I'm not a big expert when it comes to equity for start-ups in the US. I wanted to add the optionality of adding multiple company_valuations in case of a new round of investment, IPO, or acquisition. The way I calculated company_valuations is by adding up the values for the duration of the time between the `start_date` and the `date` of the valuation. See the following example:

```ts
const input = {
  "option_grants": [
    {
      "quantity": 2400,
      "start_date": "01-01-2018",
      "cliff_months": 12,
      "duration_months": 24
    }
  ],
  "company_valuations": [
    {
      "price": 10,
      "valuation_date": "09-12-2017"
    },
    {
      "price": 12,
      "valuation_date": "09-07-2018" 
    },
    {
      "price": 15,
      "valuation_date": "03-02-2019"
    }
  ]
}


const extractedValues = {
    extractedStartDate: "01-01-2018", 
    extractedPrices: [10,12,15],
    
<!--     extractedValuationDatesDays : [9,9,3],
    extractedValuationDatesMonths : [12,7,2],
    extractedValuationDatesYears : [2017,2018,2019], -->
    
    valuationDatesInEffectDays: [1,1,1],
    valuationDatesInEffectMonths: [1,8,3],
    valuationDatesInEffectYears: [2018,2018,2019],
}
```
As the timeline in the assignment shows the 1st of the month, I rounded up the values of the valuation dates to the very next 1st of the month, see `valuationDatesInEffectDays`, `valuationDatesInEffectMonths`, `valuationDatesInEffectYears`, with the idea that the new valuation starts having effect from the following month onwards. Alternatively I could have pro-rated the value with the remaining days.

Using the valuationDatesInEffect values, it was possible deduce the number of months where the valuation price was in effect. I created a function that subtracts the last values from the second-to-last values. For example, 2019 - 2018 = 1 year, 12 months, and 3 - 8 = -5 months. 12 months - 5 months is 7 months. Similarly, 2018 - 2018 = 0 years, aka 0 months, and 8 - 1 = 7 months. Hence we know that the first 7 months the price of the options was $10, after that, the next 7 months the price of the options was $12, finally, the price of the options in the remaining period was $15. 

These values were added cumulatively. See an easy visualization here:

![image](https://user-images.githubusercontent.com/69660903/204157935-ddf0c637-8916-4df9-8951-f90e64824dfd.png)

I hope you have fun using my calculator! I sure had fun building it 😎
