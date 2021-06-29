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
  const sortedNumbers = insertionSort(numbers)
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
