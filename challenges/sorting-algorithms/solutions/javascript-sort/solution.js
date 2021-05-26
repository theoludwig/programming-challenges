function minNumber(array) {
  let minNumber = { index: 0, value: array[0] }
  for (let index = 1; index < array.length; index++) {
    const number = array[index]
    if (number < minNumber.value) {
      minNumber = { index: index, value: array[index] }
    }
  }
  return minNumber
}

function solution(array) {
  const arrayDuplicated = [...array]
  const resultArray = []
  while (array.length !== resultArray.length) {
    const min = minNumber(arrayDuplicated)
    resultArray.push(min.value)
    arrayDuplicated.splice(min.index, 1)
  }
  return resultArray
}

module.exports = solution
