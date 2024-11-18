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

function solution() {
  console.log(isValidParentheses(input[0]))
}

const mapCloseOpen = {
  ")": "(",
  "]": "[",
  "}": "{",
}
const closeCharacters = Object.keys(mapCloseOpen)
const openCharacters = Object.values(mapCloseOpen)

/**
 * @param {string} string
 * @return {boolean}
 */
const isValidParentheses = (string) => {
  const stack = []
  for (let index = 0; index < string.length; index++) {
    if (openCharacters.includes(string[index])) {
      stack.push(string[index])
    } else if (closeCharacters.includes(string[index])) {
      const last = stack.pop()
      if (last !== mapCloseOpen[string[index]]) {
        return false
      }
    }
  }
  return stack.length <= 0
}
