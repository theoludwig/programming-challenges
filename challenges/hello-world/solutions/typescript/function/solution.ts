import readline from "node:readline"

const input: string[] = []
const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
readlineInterface.on("line", (value) => {
  input.push(value)
})
readlineInterface.on("close", solution)

function solution(): void {
  console.log(`Hello, ${input[0]}!`)
}
