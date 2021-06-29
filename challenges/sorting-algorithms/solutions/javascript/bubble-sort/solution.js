import readline from 'readline'

const input = []
const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
readlineInterface.on('line', (value) => {
  input.push(value)
})
readlineInterface.on('close', solution)

function solution() {
  const numbers = input.map((value) => Number(value))
  const sortedNumbers = bubbleSort(numbers.slice(1))
  sortedNumbers.forEach((number) => {
    console.log(number)
  })
}

function bubbleSort (numbersInput) {
  const numbers = [...numbersInput]
  for (let index1 = 0; index1 < numbers.length; index1++) {
    for (let index2 = 0; index2 < numbers.length - index1 - 1; index2++) {
      if (numbers[index2] > numbers[index2 + 1]) {
        const temporary = numbers[index2]
        numbers[index2] = numbers[index2 + 1]
        numbers[index2 + 1] = temporary
      }
    }
  }
  return numbers
}
