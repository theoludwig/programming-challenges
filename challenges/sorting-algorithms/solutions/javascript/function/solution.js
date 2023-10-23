import readline from "node:readline"

const numbers = []
const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
readlineInterface.on("line", (value) => {
  numbers.push(Number(value))
})
readlineInterface.on("close", solution)

function solution() {
  const sortedNumbers = nativeSort(numbers.slice(1))
  sortedNumbers.forEach((number) => {
    console.log(number)
  })
}

function nativeSort(numbers) {
  return numbers.sort((number1, number2) => number1 - number2)
}
