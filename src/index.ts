import { vestedEquityCalculator } from "./vestedEquityCalculator.js";

export default {
  async fetch(request: Request) {
    let input = await request.json();
    const output : string = JSON.stringify(vestedEquityCalculator(input));
    console.log(output)
    return new Response(output)
  },
};
