import { vestedEquityCalculator } from "./vestedEquityCalculator.js";
import { vestingCalculator } from "./vestingCalculator.js";
import { addTwo } from "./utils.js";

const resultA = vestedEquityCalculator()
console.log(resultA)

const resultB = vestingCalculator()
console.log(resultB)

export default {
  async fetch(request) {

    // read the body
    let input = await request.json()

    const output = vestedEquityCalculator(input)

    return new Response(output);
  },
};
