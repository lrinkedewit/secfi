// function to increment the month second option
export function incrementMonth (date) { 
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

