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


const extractedStartDate = "01-01-2018";
const extractedValuationDates = ["09-12-2017", "09-07-2018", "03-02-2019"]

const extractedValues = {

  extractedPrices : [10,12,15],

  // values below are created with extractValuationDates function
  extractedValuationDatesDays : [], // [9,9,3]
  extractedValuationDatesMonths : [], // [12,7,2]
  extractedValuationDatesYears : [], // [2017,2018,2019]
  // values below are created with valuationDatesInEffect function
  valuationDatesInEffectDays : [1,1,1],
  valuationDatesInEffectMonths : [1,8,3],
  valuationDatesInEffectYears : [2018,2018,2019],
  // values below are created with durationValuationCountersArray function
  durationValuationCounters : [7,7,11]
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

  extractedValues.extractedValuationDatesDays = [...days]
  extractedValues.extractedValuationDatesMonths = [...months]
  extractedValues.extractedValuationDatesYears = [...years]
}

// extractValuationDates(input)


// function that checks if the first valuation date is before the starting date
// returns true or throws an error: year should be after / month should be after / day should be after
const checkValuationDateBeforeGrantingDate = () => {
  // logic
}

// function that creates new arrays with when the valuation dates are in effect
const valuationDatesInEffect = () => {
  // logic
}


// function that adds counters to an array based on subtracting valudation dates
const durationValuationCountersArray = () => {
  // logic
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
