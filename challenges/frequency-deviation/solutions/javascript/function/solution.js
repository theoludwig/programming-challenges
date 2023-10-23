import readline from "node:readline"

import { getMaximumFrequencyDeviation } from "./getMaximumFrequencyDeviation.js"

const input = []
const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
readlineInterface.on("line", (value) => {
  input.push(value)
})

const solution = () => {
  console.log(getMaximumFrequencyDeviation(input[0]))
}

readlineInterface.on("close", solution)
