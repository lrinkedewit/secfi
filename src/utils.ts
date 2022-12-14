import { Input, Message } from "./types";

export const incrementMonth = (date: string) => { 
  const dateArray : string[] = date.split('-');
  const dateNumbersArray : number[] = dateArray.map((el) => Number(el));

  let yearNum: number = dateNumbersArray[2];
  let monthNum: number = dateNumbersArray[1];
  let dayNum: number = dateNumbersArray[0];

  if (monthNum === 12) {
    monthNum = 1
    yearNum += 1
  } else {
    monthNum += 1
  };

  let yearString: string = String(yearNum);
  let monthString: string = String(monthNum).padStart(2, '0');
  let dayString: string = String(dayNum).padStart(2, '0');

  const output: string = dayString + '-' + monthString + '-' + yearString;
  return output;
}

export const extractValuationDates = (req: Input, message: Message) => {
  const days: number[] = [];
  const months: number[] = [];
  const years: number[] = [];

  // declare an array to hold all the valuation dates
  const valuationDates: string[] = [];

  for (let i = 0; i < req.company_valuations.length; i += 1) {
    valuationDates.push(req.company_valuations[i].valuation_date)
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

  // conditional to work with multiple company_valuations or single company_valuation
  if (years.length > 1) {
    for (let i = years.length - 1; i > 0; i -= 1) {
      let monthCounter: number = 0
      monthCounter = ((years[i] - years[i - 1]) * 12) + (months[i] - months[i - 1])
      message.durationValuationCounters.push(monthCounter)
    }

    // adding final counter based on adding up durationValuationCounters and subtracting that from duration_months
    // add 1 to the value to see the price into the next month as ouput
    let sumMonthCounters: number = message.durationValuationCounters.reduce((a: number, b: number) => a + b)
    message.durationValuationCounters.push(req.option_grants[0].duration_months - sumMonthCounters + 1)
  } else {
    message.durationValuationCounters.push(req.option_grants[0].duration_months + 1)
  }

  message.valuationDatesInEffectDays = [...days]
  message.valuationDatesInEffectMonths = [...months]
  message.valuationDatesInEffectYears = [...years]
}


export const extractPrices = (req: Input, message: Message) => {

  // array to hold the prices
  const prices: number[] = [];

  // iterate through array of objects and add them to an array
  for (let i = 0; i < req.company_valuations.length; i += 1) {
    prices.push(req.company_valuations[i]["price"])
  }

  message.extractedPrices = [...prices]
}

export const extractStartDate = (req: Input, message: Message) => {
  message.extractedStartDate += req.option_grants[0].start_date;
}
