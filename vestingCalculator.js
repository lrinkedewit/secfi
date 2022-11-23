import { incrementMonth } from "./utils.js";
import { start_date } from "./variables.js";
import { cliff_months } from "./variables.js";
import { duration_months } from "./variables.js";
import { monthlyValueAdd } from "./variables.js";

export const vestingCalculator = () => {

  let accumulatedValue = 0
  let counter_duration = duration_months;
  let counter_cliff = cliff_months;
  const vestingTimeline = [];
  const monthlyVestingValue =
  {
  "vested_quantity": 0,
    "date": start_date
  }
    
  // while counter_duration > 0, continue
  while (counter_duration > -1) {

    // first check if the cliff has expired yet
    if (counter_cliff > 0) {
        monthlyVestingValue.vested_quantity = 0
    } else {
        monthlyVestingValue.vested_quantity = accumulatedValue
    }

    // push shallow clone to vestingTimeLine
    let monthlyVestingValueShallowClone = {...monthlyVestingValue}
    vestingTimeline.push(monthlyVestingValueShallowClone)

    // increment the accumulatedValue with the monthlyValueAdd
    accumulatedValue += monthlyValueAdd
    
    // increment the month by 1
    monthlyVestingValue.date = incrementMonth(monthlyVestingValue.date)
    
    // decrement counter_duration
    counter_duration -= 1;
    counter_cliff -= 1;
  }
  
  return vestingTimeline;
}

const resultA = vestingCalculator()
console.log(resultA)