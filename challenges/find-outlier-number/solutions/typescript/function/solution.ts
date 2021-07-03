import readline from 'node:readline'

const input: string[] = []
const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
readlineInterface.on('line', (value) => {
  input.push(value)
})
readlineInterface.on('close', solution)

interface NumberObject {
  value: number
  index: number
}

const isOdd = (number: number): boolean => {
  return number % 2 !== 0
}

function solution() {
  const numbers = input.map((value) => Number(value))
  const oddNumbers: NumberObject[] = []
  const evenNumbers: NumberObject[] = []
  numbers.forEach((number, index) => {
    const numberObject: NumberObject = { value: number, index }
    return isOdd(number)
      ? oddNumbers.push(numberObject)
      : evenNumbers.push(numberObject)
  })
  const isValueThatDiffersFromOthers =
    oddNumbers.length === 1 ? oddNumbers[0] : evenNumbers[0]
  console.log(isValueThatDiffersFromOthers.value)
}
