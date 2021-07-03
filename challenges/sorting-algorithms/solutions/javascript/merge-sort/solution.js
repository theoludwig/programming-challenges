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
  const sortedNumbers = mergeSort(numbers.slice(1))
  sortedNumbers.forEach((number) => {
    console.log(number)
  })
}

function divideArray (numbers) {
  const middle = Math.round(numbers.length / 2)
  const left = numbers.slice(0, middle)
  const right = numbers.slice(middle)
  return [left, right]
}

function merge (numbers1, numbers2) {
  let indexNumbers1 = 0
  let indexNumbers2 = 0
  const result = []
  while (indexNumbers1 < numbers1.length && indexNumbers2 < numbers2.length) {
    if (numbers1[indexNumbers1] < numbers2[indexNumbers2]) {
      result.push(numbers1[indexNumbers1])
      indexNumbers1 += 1
    } else {
      result.push(numbers2[indexNumbers2])
      indexNumbers2 += 1
    }
  }
  for (let index = indexNumbers1; index < numbers1.length; index++) {
    result.push(numbers1[index])
  }
  for (let index = indexNumbers2; index < numbers2.length; index++) {
    result.push(numbers2[index])
  }
  return result
}

function mergeSort (numbers) {
  if (numbers.length <= 1) {
    return numbers
  }
  let [left, right] = divideArray(numbers)
  left = mergeSort(left)
  right = mergeSort(right)
  return merge(left, right)
}
