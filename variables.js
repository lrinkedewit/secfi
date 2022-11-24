// Variables extracted from req object
export const quantity = 1200;
export const start_date = "01-01-2018";
export const cliff_months = 0;
export const duration_months = 12;

export const price_1 = 10;
export const price_2 = 12;
export const valuation_date_1 = "09-12-2017";
export const valuation_date_2 = "09-07-2018";

// Variables declared
export const monthlyValueAdd = quantity / duration_months;

export const monthlyPriceAdd = monthlyValueAdd * price;