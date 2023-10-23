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
  const string = input[0].replace(/ /g, "").toLowerCase()
  const isPalindrome = string.split("").reverse().join("") === string
  console.log(isPalindrome)
}
