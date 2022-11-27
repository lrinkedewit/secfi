import { vestedEquityCalculator } from "./vestedEquityCalculator";

export default {
  async fetch(request: Request) {
    let input = await request.json();
    const output: string = JSON.stringify(vestedEquityCalculator(input));
    return new Response(output)
  },
};
