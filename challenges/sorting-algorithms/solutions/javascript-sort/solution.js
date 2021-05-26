const minimumNumber = (array) => {
  let minimumNumber = { index: 0, value: array[0] }
  for (let index = 1; index < array.length; index++) {
    const number = array[index]
    if (number < minimumNumber.value) {
      minimumNumber = { index: index, value: array[index] }
    }
  }
  return minimumNumber
}

const solution = (array) => {
  const duplicatedArray = [...array]
  const result = []
  while (array.length !== result.length) {
    const minimum = minimumNumber(duplicatedArray)
    result.push(minimum.value)
    duplicatedArray.splice(minimum.index, 1)
  }
  return result
}

module.exports = solution
