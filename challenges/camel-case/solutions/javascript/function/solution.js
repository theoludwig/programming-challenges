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
  const string = input[0]
  const output = string
    .trim()
    .split(" ")
    .map((word, index) => {
      const isFirstElement = index === 0
      if (isFirstElement) {
        return word
      }
      return word[0].toUpperCase() + word.slice(1)
    })
    .join("")
  console.log(output)
}
