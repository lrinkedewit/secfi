import { incrementMonth } from "./utils.js";0

// EXAMPLE INPUT
// const input = {
//   "option_grants": [sws zxcvg bhnjmk,l.ol.
//     {
//       "quantity": 2400,
//       "start_date": "01-01-2018",
//       "cliff_months": 12,
//       "duration_months": 24
//     }
//   ],
//   "company_valuations": [
//     {
//       "price": 10,
//       "valuation_date": "09-12-2017"
//     },
//     {
//       "price": 12,
//       "valuation_date": "09-07-2018" 
//     },
//     {
//       "price": 15,
//       "valuation_date": "03-02-2019"
//     }
//   ]
// }


// const vestingMessage = {

//   // values below are initated by invoking extractStartDate()
//   extractedStartDate : "", // "01-01-2018",

//   // values below are initated by invoking extractPrices()
//   extractedPrices : [], // [10,12,15]

//   // values below are initiated by invoking extractValuationDates()
//   valuationDatesInEffectDays : [], // [1,1,1]
//   valuationDatesInEffectMonths : [], // [1,8,3]
//   valuationDatesInEffectYears : [], // [2018,2018,2019]

//   // values below are created with durationValuationCountersArray function
//   durationValuationCounters : [] // [7,7,11]
// }

const extractValuationDates = (req, message) => {
  const days = [];
  const months = [];
  const years = [];

  // declare an array to hold all the valuation dates
  const valuationDates = [];

  for (let i = 0; i < req.company_valuations.length; i += 1) {
    valuationDates.push(req.company_valuations[i]["valuation_date"])
  }

  for (let i = 0; i < valuationDates.length; i += 1) {
    const dateArray = valuationDates[i].split('-');
    const dateNumbersArray = dateArray.map((el) => Number(el))

    days.push(dateNumbersArray[0]);
    months.push(dateNumbersArray[1]);
    years.push(dateNumbersArray[2]);
  };

  // functionality that rounds up all dates that are later than the 1st of the month
  for (let i = 0; i < days.length; i += 1) {
    if (days[i] > 1) {
      if (months[i] === 12) {
        days[i] = 1;
        months[i] = 1;
        years[i] += 1;
      }
      else {
        days[i] = 1;
        months[i] += 1;
      }
    }

  }

  for (let i = years.length - 1; i > 0; i -= 1) {
    let monthCounter = 0
    monthCounter = ((years[i] - years[i - 1]) * 12) + (months[i] - months[i - 1])
    message.durationValuationCounters.push(monthCounter)
  }

  // adding final counter based on adding up durationValuationCounters and subtracting that from duration_months
  // add 1 to the value to see the price into the next month as ouput
  let sumMonthCounters = message.durationValuationCounters.reduce((a,b) => a + b)
  message.durationValuationCounters.push(req.option_grants[0].duration_months - sumMonthCounters + 1)

  message.valuationDatesInEffectDays = [...days]
  message.valuationDatesInEffectMonths = [...months]
  message.valuationDatesInEffectYears = [...years]
}

const extractPrices = (req, message) => {

  // array to hold the prices
  const prices = [];

  // iterate through array of objects and add them to an array
  for (let i = 0; i < req.company_valuations.length; i += 1) {
    prices.push(req.company_valuations[i]["price"])
  }

  message.extractedPrices = [...prices]
}

const extractStartDate = (req, message) => {
  message.extractedStartDate += req.option_grants[0].start_date;
}

export const vestedEquityCalculator = (req) => {

  const vestingMessage = {

    // values below are initated by invoking extractStartDate()
    extractedStartDate : "", // "01-01-2018",
  
    // values below are initated by invoking extractPrices()
    extractedPrices : [], // [10,12,15]
  
    // values below are initiated by invoking extractValuationDates()
    valuationDatesInEffectDays : [], // [1,1,1]
    valuationDatesInEffectMonths : [], // [1,8,3]
    valuationDatesInEffectYears : [], // [2018,2018,2019]
  
    // values below are created with durationValuationCountersArray function
    durationValuationCounters : [] // [7,7,11]
  }

  let accumulatedPrice = 0;
  let counter_cliff = req.option_grants[0].cliff_months;
  const vestedEquityTimeline = [];
  const monthlyVestedEquityValue =
  {
    "total_value": 0.0,
    "date": req.option_grants[0].start_date
  }

  extractValuationDates(req, vestingMessage)
  extractPrices(req, vestingMessage)
  extractStartDate(req, vestingMessage)

  // for loop that lasts for the duration of the counter array
  for (let i = 0; i < vestingMessage.durationValuationCounters.length; i +=1) {
    
    // while counter_duration > 0, continue
    while (vestingMessage.durationValuationCounters[i] > 0) {

      // again, first check if the cliff has expired yet
      if (counter_cliff > 0) {
          monthlyVestedEquityValue.total_value = 0.0
      } else {
          monthlyVestedEquityValue.total_value = accumulatedPrice
      }

      // push shallow clone to vestedEquityTimeline
      let monthlyVestedEquityValueShallowClone = {...monthlyVestedEquityValue}
      vestedEquityTimeline.push(monthlyVestedEquityValueShallowClone)

      // increment the accumulatedValue with the monthlyValueAdd
      accumulatedPrice += vestingMessage.extractedPrices[i];
      
      // increment the month by 1
      monthlyVestedEquityValue.date = incrementMonth(monthlyVestedEquityValue.date)
      
      // decrement counter_duration
      vestingMessage.durationValuationCounters[i] -= 1;
      counter_cliff -= 1;
    }
  }

  return vestedEquityTimeline;
}

// const resultB = vestedEquityCalculator(input)
// console.log(resultB)
