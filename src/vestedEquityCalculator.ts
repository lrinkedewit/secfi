import { extractPrices, extractStartDate, extractValuationDates, incrementMonth } from "./utils";
import { Input, Message, MonthlyVestedEquityValue } from "./types";

export const vestedEquityCalculator = (req: Input) => {

  const vestingMessage: Message = {
    extractedStartDate: "", 
  
    // Price per company valuation
    extractedPrices: [],
  
    // Company valuation dates
    valuationDatesInEffectDays: [],
    valuationDatesInEffectMonths: [],
    valuationDatesInEffectYears: [],
  
    // For internal use
    durationValuationCounters: []
  }

  let accumulatedPrice = 0;
  let counter_cliff = req.option_grants[0].cliff_months;
  const vestedEquityTimeline: MonthlyVestedEquityValue[] = [];
  const monthlyVestedEquityValue: MonthlyVestedEquityValue = {
    "total_value": 0,
    "date": req.option_grants[0].start_date
  };
  const monthlyValueAdd = req.option_grants[0].quantity / req.option_grants[0].duration_months;

  extractValuationDates(req, vestingMessage);
  extractPrices(req, vestingMessage);
  extractStartDate(req, vestingMessage);

  // Loop and calculate for each company valuation
  for (let i = 0; i < vestingMessage.durationValuationCounters.length; i +=1) {
    
    // while counter_duration > 0, continue
    while (vestingMessage.durationValuationCounters[i] > 0) {

      // check if the cliff has expired yet
      if (counter_cliff > 0) {
          monthlyVestedEquityValue.total_value = 0.0;
      } else {
          monthlyVestedEquityValue.total_value = accumulatedPrice;
      }

      // push shallow clone to vestedEquityTimeline
      let monthlyVestedEquityValueShallowClone : MonthlyVestedEquityValue = {...monthlyVestedEquityValue}
      vestedEquityTimeline.push(monthlyVestedEquityValueShallowClone)

      // increment the accumulatedValue with the monthlyValueAdd
      accumulatedPrice += vestingMessage.extractedPrices[i] * monthlyValueAdd;
      
      // increment the month by 1
      monthlyVestedEquityValue.date = incrementMonth(monthlyVestedEquityValue.date)
      
      // decrement counter_duration
      vestingMessage.durationValuationCounters[i] -= 1;
      counter_cliff -= 1;
    }
  };

  return vestedEquityTimeline;
}
