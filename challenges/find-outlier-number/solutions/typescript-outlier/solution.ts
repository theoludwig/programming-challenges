interface NumberObject {
  value: number
  index: number
}

function isOdd(number: number): boolean {
  return number % 2 !== 0
}

function solution(numbers: number[]): number {
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
  return isValueThatDiffersFromOthers.value
}

export default solution
