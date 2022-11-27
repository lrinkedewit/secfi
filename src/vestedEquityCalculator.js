import { incrementMonth } from "./utils.js";0
import { extractValuationDates } from "./utils.js";
import { extractPrices } from "./utils.js";
import { extractStartDate } from "./utils.js";


export const vestedEquityCalculator = (req) => {

  const vestingMessage = {
    // values below are initated by invoking extractStartDate()
    extractedStartDate : "", 
  
    // values below are initated by invoking extractPrices()
    extractedPrices : [],
  
    // values below are initiated by invoking extractValuationDates()
    valuationDatesInEffectDays : [],
    valuationDatesInEffectMonths : [],
    valuationDatesInEffectYears : [], 
  
    // values below are created with durationValuationCountersArray function
    durationValuationCounters : []
  }

  let accumulatedPrice = 0;
  let counter_cliff = req.option_grants[0].cliff_months;
  const vestedEquityTimeline = [];
  const monthlyVestedEquityValue =
  {
    "total_value": 0.0,
    "date": req.option_grants[0].start_date
  };

  extractValuationDates(req, vestingMessage);
  extractPrices(req, vestingMessage);
  extractStartDate(req, vestingMessage);

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
  };

  return vestedEquityTimeline;
}

// const resultB = vestedEquityCalculator(input)
// console.log(resultB)
