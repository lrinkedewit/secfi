import { vestedEquityCalculator } from "./vestedEquityCalculator.js";

export default {
  async fetch(request) {
    let input = await request.json();
    const output = vestedEquityCalculator(input);
    console.log(output)
    return new Response(output)
  },
};
