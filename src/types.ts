type OptionGrant = {
  quantity: number,
  start_date: string,
  cliff_months: number,
  duration_months: number
}

type Valuation = {
  price: number,
  valuation_date: string
}

export type Input = {
  readonly option_grants: OptionGrant[],
  readonly company_valuations: Valuation[]
} 

export type Message = {
  extractedStartDate: string,
  extractedPrices: number[],
  valuationDatesInEffectDays: number[],
  valuationDatesInEffectMonths : number[],
  valuationDatesInEffectYears : number[], 
  durationValuationCounters : number[]
}

export type MonthlyVestedEquityValue = {
  total_value: number,
  date: string
}
