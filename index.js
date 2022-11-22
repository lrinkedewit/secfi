/**
 * a. Calculating the vesting timeline
 * 
 * Three variables: granting date ("dd-mm-yyyy"), cliff months (0 || 12 months), total duration (36 - 60 months)
 * 
 * granting date = when you were given your options
 * cliff = when your stock options start gaining value, either directly (0) or after 1 year (12 months)
 * total duration = the amount of time it takes for your options to fully vest
 * 
 */

const inputMainFunc = [
  {
    "quantity": 4800,
    "start_date": "01-01-2018",
    "cliff_months": 12,
    "duration_months": 48
  }
]

const outputMainFunc = [
  {
    "vested_quantity": 0,
    "date": "01-01-2018"
  },
  {
    "vested_quantity": 0,
    "date": "01-02-2018"
  },
  {
    "vested_quantity": 0,
    "date": "01-03-2018"
  },
  {
    "vested_quantity": 0,
    "date": "01-04-2018"
  },
  {
    "vested_quantity": 0,
    "date": "01-05-2018"
  },
  {
    "vested_quantity": 0,
    "date": "01-06-2018"
  },
  {
    "vested_quantity": 0,
    "date": "01-07-2018"
  },
  {
    "vested_quantity": 0,
    "date": "01-08-2018"
  },
  {
    "vested_quantity": 0,
    "date": "01-09-2018"
  },
  {
    "vested_quantity": 0,
    "date": "01-10-2018"
  },
  {
    "vested_quantity": 0,
    "date": "01-11-2018"
  },
  {
    "vested_quantity": 0,
    "date": "01-12-2018"
  },
  {
    "vested_quantity": 1200,
    "date": "01-01-2019"
  },
  {
    "vested_quantity": 1300,
    "date": "01-02-2019"
  },
  {
    "vested_quantity": 1400,
    "date": "01-03-2019"
  },
  {
    "vested_quantity": 1500,
    "date": "01-04-2019"
  },
  {
    "vested_quantity": 1600,
    "date": "01-05-2019"
  },
  {
    "vested_quantity": 1700,
    "date": "01-06-2019"
  },
  {
    "vested_quantity": 1800,
    "date": "01-07-2019"
  },
  {
    "vested_quantity": 1900,
    "date": "01-08-2019"
  },
  {
    "vested_quantity": 2000,
    "date": "01-09-2019"
  },
  {
    "vested_quantity": 2100,
    "date": "01-10-2019"
  },
  {
    "vested_quantity": 2200,
    "date": "01-11-2019"
  },
  {
    "vested_quantity": 2300,
    "date": "01-12-2019"
  },
  {
    "vested_quantity": 2400,
    "date": "01-01-2020"
  },
  {
    "vested_quantity": 2500,
    "date": "01-02-2020"
  },
  {
    "vested_quantity": 2600,
    "date": "01-03-2020"
  },
  {
    "vested_quantity": 2700,
    "date": "01-04-2020"
  },
  {
    "vested_quantity": 2800,
    "date": "01-05-2020"
  },
  {
    "vested_quantity": 2900,
    "date": "01-06-2020"
  },
  {
    "vested_quantity": 3000,
    "date": "01-07-2020"
  },
  {
    "vested_quantity": 3100,
    "date": "01-08-2020"
  },
  {
    "vested_quantity": 3200,
    "date": "01-09-2020"
  },
  {
    "vested_quantity": 3300,
    "date": "01-10-2020"
  },
  {
    "vested_quantity": 3400,
    "date": "01-11-2020"
  },
  {
    "vested_quantity": 3500,
    "date": "01-12-2020"
  },
  {
    "vested_quantity": 3600,
    "date": "01-01-2021"
  },
  {
    "vested_quantity": 3700,
    "date": "01-02-2021"
  },
  {
    "vested_quantity": 3800,
    "date": "01-03-2021"
  },
  {
    "vested_quantity": 3900,
    "date": "01-04-2021"
  },
  {
    "vested_quantity": 4000,
    "date": "01-05-2021"
  },
  {
    "vested_quantity": 4100,
    "date": "01-06-2021"
  },
  {
    "vested_quantity": 4200,
    "date": "01-07-2021"
  },
  {
    "vested_quantity": 4300,
    "date": "01-08-2021"
  },
  {
    "vested_quantity": 4400,
    "date": "01-09-2021"
  },
  {
    "vested_quantity": 4500,
    "date": "01-10-2021"
  },
  {
    "vested_quantity": 4600,
    "date": "01-11-2021"
  },
  {
    "vested_quantity": 4700,
    "date": "01-12-2021"
  },
  {
    "vested_quantity": 4800,
    "date": "01-01-2022"
  }
]


// function to increment the month second option
function incrementMonth (date) { 
  const dateArray = date.split('-');
  const dateNumbersArray = dateArray.map((el) => Number(el))

  let yearNum = dateNumbersArray[2];
  let monthNum = dateNumbersArray[1];
  let dayNum = dateNumbersArray[0];

  if (monthNum === 12) {
    monthNum = 1
    yearNum += 1
  } else {
    monthNum += 1
  }

  let yearString = String(yearNum);
  let monthString = String(monthNum).padStart(2, '0');
  let dayString = String(dayNum).padStart(2, '0');

  const output = dayString + '-' + monthString + '-' + yearString
  return output;
}






  // EXAMPLE
  // console.log(`dateIncremented`, incrementMonth("2018-12-01"))


// function to make deep clones of objects


// Variables extracted from req object
const quantity = 4800;
const start_date = "01-01-2018";
const cliff_months = 12;
const duration_months = 48;

// Variables declared


const monthlyValueAdd = quantity / duration_months
let date = start_date

const vestingCalculator = () => {

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
  while (counter_duration > 0) {

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

result = vestingCalculator()
console.log(result)






// let d = ne Date("2018-01-01");
// console.log(d); //Sun Feb 20 2022
 
// d.setMonth(d.getMonth() + 1);
// console.log(d)
// ; //Sun Mar 20 2022






// 4800 / 48 = 100 / month
// after 12 months, receive the first 100 * 12
// eventually we want to print out duration_months + 1 value, so in this case 49 objects

