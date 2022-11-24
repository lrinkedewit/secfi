import { incrementMonth } from "./utils.js";
import { start_date } from "./variables.js";
import { cliff_months } from "./variables.js";
import { duration_months } from "./variables.js";
import { monthlyPriceAdd } from "./variables.js";

import { price_1 } from "./variables.js";
import { price_2 } from "./variables.js";
import { valuation_date_1 } from "./variables.js";
import { valuation_date_2 } from "./variables.js";

export const vestedEquityCalculator = () => {

  let accumulatedPrice = 0;
  let counter_duration = duration_months;
  let counter_cliff = cliff_months;
  const vestedEquityTimeline = [];
  const monthlyVestedEquityValue =
  {
    "total_value": 0.0,
    "date": start_date
  }
    
  // while counter_duration > -1, continue
  while (counter_duration > -1) {

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
    accumulatedPrice += monthlyPriceAdd
    
    // increment the month by 1
    monthlyVestedEquityValue.date = incrementMonth(monthlyVestedEquityValue.date)
    
    // decrement counter_duration
    counter_duration -= 1;
    counter_cliff -= 1;
  }
  
  return vestedEquityTimeline;
}

const resultB = vestedEquityCalculator()
console.log(resultB)
