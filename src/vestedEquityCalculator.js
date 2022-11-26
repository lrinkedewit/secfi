import { incrementMonth } from "./utils.js";
import { start_date } from "./variables.js";
import { cliff_months } from "./variables.js";
import { duration_months } from "./variables.js";


// EXAMPLE INPUT
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


// function that extracts the valuation dates and adds them to an array
// throw an error if the date isn't in the right format
const extractValuationDates = (req) => {
  // declare array to keep track of days
  const days = [];
  // declare array to keep track of months
  const months = [];
  // declare array to keep track of years
  const years = [];

  // declare an array to hold all the valuation dates
  const valuationDates = [];

  // iterate through array of objects and add them to an array
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
    extractedValues.durationValuationCounters.push(monthCounter)
  }

  // adding final counter based on adding up durationValuationCounters and subtracting that from duration_months
  // add 1 to the value to see the price into the next month as ouput
  let sumMonthCounters = extractedValues.durationValuationCounters.reduce((a,b) => a + b)
  console.log(`this is the sumMonths`, sumMonthCounters)
  extractedValues.durationValuationCounters.push(req.option_grants[0].duration_months - sumMonthCounters + 1)

  extractedValues.valuationDatesInEffectDays = [...days]
  extractedValues.valuationDatesInEffectMonths = [...months]
  extractedValues.valuationDatesInEffectYears = [...years]
}

// extractValuationDates(input)
// console.log(`1`, extractedValues)

// function that extracts the prices and places them in an array
const extractPrices = (req) => {

  // array to hold the prices
  const prices = [];

  // iterate through array of objects and add them to an array
  for (let i = 0; i < req.company_valuations.length; i += 1) {
    prices.push(req.company_valuations[i]["price"])
  }

  extractedValues.extractedPrices = [...prices]
}

extractPrices(input)

// function that extracts the startdate
const extractStartDate = (req) => {
  extractedValues.extractedStartDate += req.option_grants[0].start_date;
}

extractStartDate(input)
// console.log(`3`, extractedValues)



// function that checks if the first valuation date is before the starting date
// returns true or throws an error: year should be after / month should be after / day should be after
const checkValuationDateBeforeGrantingDate = () => {
  // logic
}

// valuationDatesInEffectDays : [1,1,1]
// valuationDatesInEffectMonths : [1,8,3]
// valuationDatesInEffectYears : [2018,2018,2019]

// function that adds counters to an array based on subtracting valudation dates
const durationValuationCountersArray = () => {
  // the last value should be added with 1, so that the first month of the next year is displayed
}

export const vestedEquityCalculator = () => {

  let accumulatedPrice = 0;
  let counter_cliff = cliff_months;
  const vestedEquityTimeline = [];
  const monthlyVestedEquityValue =
  {
    "total_value": 0.0,
    "date": start_date
  }

  // for loop that lasts for the duration of the counter array
  for (let i = 0; i < extractedValues.durationValuationCounters.length; i +=1) {
    
    // while counter_duration > -1, continue
    while (extractedValues.durationValuationCounters[i] > 0) {

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
      accumulatedPrice += extractedValues.extractedPrices[i];
      
      // increment the month by 1
      monthlyVestedEquityValue.date = incrementMonth(monthlyVestedEquityValue.date)
      
      // decrement counter_duration
      extractedValues.durationValuationCounters[i] -= 1;
      counter_cliff -= 1;
    }
  }

  
  return vestedEquityTimeline;
}

const resultB = vestedEquityCalculator()
console.log(resultB)
