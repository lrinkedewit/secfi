import {describe, expect, test} from '@jest/globals';

import { vestedEquityCalculator } from './vestedEquityCalculator';



describe('vestedEquityCalculator', () => {
  describe('sample request alternative assignment b)', () => {

    const input = {
      "option_grants": [
        {
          "quantity": 4800,
          "start_date": "01-01-2018",
          "cliff_months": 12,
          "duration_months": 48
        }
      ],
      "company_valuations": [
        {
          "price": 10,
          "valuation_date": "09-12-2017"
        }
      ]
    }

    const output = [
      {
          "total_value": 0,
          "date": "01-01-2018"
      },
      {
          "total_value": 0,
          "date": "01-02-2018"
      },
      {
          "total_value": 0,
          "date": "01-03-2018"
      },
      {
          "total_value": 0,
          "date": "01-04-2018"
      },
      {
          "total_value": 0,
          "date": "01-05-2018"
      },
      {
          "total_value": 0,
          "date": "01-06-2018"
      },
      {
          "total_value": 0,
          "date": "01-07-2018"
      },
      {
          "total_value": 0,
          "date": "01-08-2018"
      },
      {
          "total_value": 0,
          "date": "01-09-2018"
      },
      {
          "total_value": 0,
          "date": "01-10-2018"
      },
      {
          "total_value": 0,
          "date": "01-11-2018"
      },
      {
          "total_value": 0,
          "date": "01-12-2018"
      },
      {
          "total_value": 12000,
          "date": "01-01-2019"
      },
      {
          "total_value": 13000,
          "date": "01-02-2019"
      },
      {
          "total_value": 14000,
          "date": "01-03-2019"
      },
      {
          "total_value": 15000,
          "date": "01-04-2019"
      },
      {
          "total_value": 16000,
          "date": "01-05-2019"
      },
      {
          "total_value": 17000,
          "date": "01-06-2019"
      },
      {
          "total_value": 18000,
          "date": "01-07-2019"
      },
      {
          "total_value": 19000,
          "date": "01-08-2019"
      },
      {
          "total_value": 20000,
          "date": "01-09-2019"
      },
      {
          "total_value": 21000,
          "date": "01-10-2019"
      },
      {
          "total_value": 22000,
          "date": "01-11-2019"
      },
      {
          "total_value": 23000,
          "date": "01-12-2019"
      },
      {
          "total_value": 24000,
          "date": "01-01-2020"
      },
      {
          "total_value": 25000,
          "date": "01-02-2020"
      },
      {
          "total_value": 26000,
          "date": "01-03-2020"
      },
      {
          "total_value": 27000,
          "date": "01-04-2020"
      },
      {
          "total_value": 28000,
          "date": "01-05-2020"
      },
      {
          "total_value": 29000,
          "date": "01-06-2020"
      },
      {
          "total_value": 30000,
          "date": "01-07-2020"
      },
      {
          "total_value": 31000,
          "date": "01-08-2020"
      },
      {
          "total_value": 32000,
          "date": "01-09-2020"
      },
      {
          "total_value": 33000,
          "date": "01-10-2020"
      },
      {
          "total_value": 34000,
          "date": "01-11-2020"
      },
      {
          "total_value": 35000,
          "date": "01-12-2020"
      },
      {
          "total_value": 36000,
          "date": "01-01-2021"
      },
      {
          "total_value": 37000,
          "date": "01-02-2021"
      },
      {
          "total_value": 38000,
          "date": "01-03-2021"
      },
      {
          "total_value": 39000,
          "date": "01-04-2021"
      },
      {
          "total_value": 40000,
          "date": "01-05-2021"
      },
      {
          "total_value": 41000,
          "date": "01-06-2021"
      },
      {
          "total_value": 42000,
          "date": "01-07-2021"
      },
      {
          "total_value": 43000,
          "date": "01-08-2021"
      },
      {
          "total_value": 44000,
          "date": "01-09-2021"
      },
      {
          "total_value": 45000,
          "date": "01-10-2021"
      },
      {
          "total_value": 46000,
          "date": "01-11-2021"
      },
      {
          "total_value": 47000,
          "date": "01-12-2021"
      },
      {
          "total_value": 48000,
          "date": "01-01-2022"
      }
  ]

    
    test('returns an array with the total value of vested options with a 1 year cliff', () => {
      expect(vestedEquityCalculator(input)).toStrictEqual(output);
    });
  });

  describe('sample request with no cliff (cliff_months: 0)', () => {
    const input = {
      "option_grants": [
        {
          "quantity": 4800,
          "start_date": "01-01-2018",
          "cliff_months": 0,
          "duration_months": 48
        }
      ],
      "company_valuations": [
        {
          "price": 10,
          "valuation_date": "09-12-2017"
        }
      ]
    }

    const output = [
      {
          "total_value": 0,
          "date": "01-01-2018"
      },
      {
          "total_value": 1000,
          "date": "01-02-2018"
      },
      {
          "total_value": 2000,
          "date": "01-03-2018"
      },
      {
          "total_value": 3000,
          "date": "01-04-2018"
      },
      {
          "total_value": 4000,
          "date": "01-05-2018"
      },
      {
          "total_value": 5000,
          "date": "01-06-2018"
      },
      {
          "total_value": 6000,
          "date": "01-07-2018"
      },
      {
          "total_value": 7000,
          "date": "01-08-2018"
      },
      {
          "total_value": 8000,
          "date": "01-09-2018"
      },
      {
          "total_value": 9000,
          "date": "01-10-2018"
      },
      {
          "total_value": 10000,
          "date": "01-11-2018"
      },
      {
          "total_value": 11000,
          "date": "01-12-2018"
      },
      {
          "total_value": 12000,
          "date": "01-01-2019"
      },
      {
          "total_value": 13000,
          "date": "01-02-2019"
      },
      {
          "total_value": 14000,
          "date": "01-03-2019"
      },
      {
          "total_value": 15000,
          "date": "01-04-2019"
      },
      {
          "total_value": 16000,
          "date": "01-05-2019"
      },
      {
          "total_value": 17000,
          "date": "01-06-2019"
      },
      {
          "total_value": 18000,
          "date": "01-07-2019"
      },
      {
          "total_value": 19000,
          "date": "01-08-2019"
      },
      {
          "total_value": 20000,
          "date": "01-09-2019"
      },
      {
          "total_value": 21000,
          "date": "01-10-2019"
      },
      {
          "total_value": 22000,
          "date": "01-11-2019"
      },
      {
          "total_value": 23000,
          "date": "01-12-2019"
      },
      {
          "total_value": 24000,
          "date": "01-01-2020"
      },
      {
          "total_value": 25000,
          "date": "01-02-2020"
      },
      {
          "total_value": 26000,
          "date": "01-03-2020"
      },
      {
          "total_value": 27000,
          "date": "01-04-2020"
      },
      {
          "total_value": 28000,
          "date": "01-05-2020"
      },
      {
          "total_value": 29000,
          "date": "01-06-2020"
      },
      {
          "total_value": 30000,
          "date": "01-07-2020"
      },
      {
          "total_value": 31000,
          "date": "01-08-2020"
      },
      {
          "total_value": 32000,
          "date": "01-09-2020"
      },
      {
          "total_value": 33000,
          "date": "01-10-2020"
      },
      {
          "total_value": 34000,
          "date": "01-11-2020"
      },
      {
          "total_value": 35000,
          "date": "01-12-2020"
      },
      {
          "total_value": 36000,
          "date": "01-01-2021"
      },
      {
          "total_value": 37000,
          "date": "01-02-2021"
      },
      {
          "total_value": 38000,
          "date": "01-03-2021"
      },
      {
          "total_value": 39000,
          "date": "01-04-2021"
      },
      {
          "total_value": 40000,
          "date": "01-05-2021"
      },
      {
          "total_value": 41000,
          "date": "01-06-2021"
      },
      {
          "total_value": 42000,
          "date": "01-07-2021"
      },
      {
          "total_value": 43000,
          "date": "01-08-2021"
      },
      {
          "total_value": 44000,
          "date": "01-09-2021"
      },
      {
          "total_value": 45000,
          "date": "01-10-2021"
      },
      {
          "total_value": 46000,
          "date": "01-11-2021"
      },
      {
          "total_value": 47000,
          "date": "01-12-2021"
      },
      {
          "total_value": 48000,
          "date": "01-01-2022"
      }
    ]

    test('returns an array with the total value of vested options no cliff', () => {
      expect(vestedEquityCalculator(input)).toStrictEqual(output);
    });
  })

  describe('sample request with multiple company valuations', () => {

    const input = {
      "option_grants": [
        {
          "quantity": 2400,
          "start_date": "01-01-2018",
          "cliff_months": 12,
          "duration_months": 24
        }
      ],
      "company_valuations": [
        {
          "price": 10,
          "valuation_date": "09-12-2017"
        },
        {
          "price": 12,
          "valuation_date": "09-07-2018" 
        },
        {
          "price": 15,
          "valuation_date": "03-02-2019"
        }
      ]
    }

    const output = [
      {
          "total_value": 0,
          "date": "01-01-2018"
      },
      {
          "total_value": 0,
          "date": "01-02-2018"
      },
      {
          "total_value": 0,
          "date": "01-03-2018"
      },
      {
          "total_value": 0,
          "date": "01-04-2018"
      },
      {
          "total_value": 0,
          "date": "01-05-2018"
      },
      {
          "total_value": 0,
          "date": "01-06-2018"
      },
      {
          "total_value": 0,
          "date": "01-07-2018"
      },
      {
          "total_value": 0,
          "date": "01-08-2018"
      },
      {
          "total_value": 0,
          "date": "01-09-2018"
      },
      {
          "total_value": 0,
          "date": "01-10-2018"
      },
      {
          "total_value": 0,
          "date": "01-11-2018"
      },
      {
          "total_value": 0,
          "date": "01-12-2018"
      },
      {
          "total_value": 13000,
          "date": "01-01-2019"
      },
      {
          "total_value": 14200,
          "date": "01-02-2019"
      },
      {
          "total_value": 15400,
          "date": "01-03-2019"
      },
      {
          "total_value": 16900,
          "date": "01-04-2019"
      },
      {
          "total_value": 18400,
          "date": "01-05-2019"
      },
      {
          "total_value": 19900,
          "date": "01-06-2019"
      },
      {
          "total_value": 21400,
          "date": "01-07-2019"
      },
      {
          "total_value": 22900,
          "date": "01-08-2019"
      },
      {
          "total_value": 24400,
          "date": "01-09-2019"
      },
      {
          "total_value": 25900,
          "date": "01-10-2019"
      },
      {
          "total_value": 27400,
          "date": "01-11-2019"
      },
      {
          "total_value": 28900,
          "date": "01-12-2019"
      },
      {
          "total_value": 30400,
          "date": "01-01-2020"
      }
    ]

    test('returns an array with the total value of vested options with different company_valuations', () => {
      expect(vestedEquityCalculator(input)).toStrictEqual(output);
    });
  });
});

