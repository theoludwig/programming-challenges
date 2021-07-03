import readline from 'node:readline'

const numbers = []
const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
readlineInterface.on('line', (value) => {
  numbers.push(Number(value))
})
readlineInterface.on('close', solution)

function solution() {
  const sortedNumbers = insertionSort(numbers.slice(1))
  sortedNumbers.forEach((number) => {
    console.log(number)
  })
}

function insertionSort(numbersInput) {
  const numbers = [...numbersInput]
  for (let index1 = 1; index1 < numbers.length; index1++) {
    const current = numbers[index1]
    let index2 = index1 - 1
    while (index2 >= 0 && numbers[index2] > current) {
      numbers[index2 + 1] = numbers[index2]
      index2 -= 1
    }
    numbers[index2 + 1] = current
  }
  return numbers
}
