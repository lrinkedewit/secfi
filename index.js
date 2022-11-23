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

const inputA = [
  {
    "quantity": 4800,
    "start_date": "01-01-2018",
    "cliff_months": 12,
    "duration_months": 48
  }
]

const outputA = [
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
const price = 10.0

// Variables declared


const monthlyValueAdd = quantity / duration_months;
const monthlyPriceAdd = monthlyValueAdd * price;
let date = start_date;

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



/**
 * b. Calculating the value of the vested equity over time
 * Now consider that the stock for which if you have options has of course a value and this value can change over time; for example because of a new round of investment, among other things.
 * In this part, we ask you to take this into consideration and return not the quantity of vested options but the total value of said vested options by using the provided valuations (see the sample request below). You may consider that there will be a valuation before a grant is awarded.
 * As in the previous section, take this request and response both as an API reference and as a very simple test for your service.

 */

// INPUT
const inputB = 
{
  "option_grants": [
    {
      "quantity": 4800,
      "start_date": "01-01-2018",
      "cliff_months": 12,
      "duration_months": 48
 } ],
  "company_valuations": [
    {
      "price": 10.0,
      "valuation_date": "09-12-2017"
    }
 ] 
}


// OUTPUT

const outputB = 
 [ 
  {
    "total_value": 0.0,
    "date": "01-01-2018"
  },
  {
    "total_value": 0.0,
    "date": "01-02-2018"
  }, 


  {
    "total_value": 12000.0,
    "date": "01-01-2019"
  },
  {
    "total_value": 13000.0,
    "date": "01-02-2019"
  }, 


  {
    "total_value": 48000.0,
    "date": "01-01-2022"
  } 
]


const vestedEquityCalculator = () => {

  let accumulatedPrice = 0.0;
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

