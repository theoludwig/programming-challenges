function solution(arr, arg) {
  return arr.reduce((accumulator, currentNumber, indexReduce, array) => {
    for (let index = indexReduce + 1; index < array.length; index++) {
      if (array[index] + array[indexReduce] === arg) {
        accumulator += indexReduce + index
        array[indexReduce] = NaN
        array[index] = NaN
        break
      }
    }
    return accumulator
  }, 0)
}

module.exports = solution
