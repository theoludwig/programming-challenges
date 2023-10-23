import readline from "node:readline"

const input = []
const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
readlineInterface.on("line", (value) => {
  input.push(value)
})
readlineInterface.on("close", solution)

const operations = {
  "+": (number1, number2) => number1 + number2,
  "-": (number1, number2) => number1 - number2,
  "*": (number1, number2) => number1 * number2,
  "/": (number1, number2) => number1 / number2,
}

function solution() {
  console.log(reversePolishNotation(input[0]))
}

function reversePolishNotation(value) {
  if (value.length === 0) {
    return 0
  }
  const stack = []
  const values = value.split(" ")
  values.forEach((value) => {
    const number = Number(value)
    if (!isNaN(number)) {
      stack.push(number)
    } else if (operations.hasOwnProperty(value)) {
      const number1 = stack.pop()
      const number2 = stack.pop()
      const operation = operations[value]
      const result = operation(number2, number1)
      stack.push(result)
    }
  })
  return stack.pop()
}
