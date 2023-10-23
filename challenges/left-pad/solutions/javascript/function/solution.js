import readline from "node:readline"

/**
 *
 * @param {string} string
 * @param {number} resultLength
 * @param {string} padString
 * @returns {string}
 */
const leftPad = (string, resultLength, padString) => {
  resultLength = resultLength - string.length
  if (resultLength <= 0) {
    return string
  }
  let pad = ""
  while (resultLength !== 0) {
    if (resultLength & 1) {
      pad += padString
    }
    resultLength >>= 1
    if (resultLength) {
      padString += padString
    }
  }
  return pad + string
}

const solution = () => {
  console.log(leftPad(input[0], Number(input[1]), input[2]))
}

const input = []
const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
readlineInterface.on("line", (value) => {
  input.push(value)
})
readlineInterface.on("close", solution)
