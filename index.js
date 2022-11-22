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

// function to change date format
function reverseDateFormat(dateString) {
  let reversedDate = dateString.split('-').reverse().join('-')
  return reversedDate
}

  // EXAMPLE
  console.log(`reversedDateFormat`, reverseDateFormat("01-01-2018"))



// function to increment the month
function incrementMonth(num, date) {

  let dateObject = new Date(date)  
  
  while (num > 0) {
    dateObject.setMonth(dateObject.getMonth() + 1)
    num -= 1;
  }
  return dateObject;
}

  // EXAMPLE
  console.log(`dateIncremented`, incrementMonth(4, "2018-09-01"))





// function vestingTimeline takes in an array containing an object with the values: quantity, start_date, cliff_months, duration_months

function vestingTimeline() {
  // verify that the array contains the object with all properties as expected

  const output = [];

  let quantity = 4800
  let start_date = "01-01-2018"
  let cliff_months = 12
  let duration_months = 48

  // used -1 to account for the first month
  while (duration_months > -1) {

    // object that will be pushed to our output array
    const monthlyVestingValue = {
      "vested_quantity": 0,
      // write function that increments the date every month
      "date": start_date
    };

    // push object with vested quantity and date to output array
    output.push(monthlyVestingValue)

    // decrease duration_months by 1
    duration_months -= 1
  }

  return output;

}







// let d = ne Date("2018-01-01");
// console.log(d); //Sun Feb 20 2022
 
// d.setMonth(d.getMonth() + 1);
// console.log(d)
// ; //Sun Mar 20 2022






// 4800 / 48 = 100 / month
// after 12 months, receive the first 100 * 12
// eventually we want to print out duration_months + 1 value, so in this case 49 objects

