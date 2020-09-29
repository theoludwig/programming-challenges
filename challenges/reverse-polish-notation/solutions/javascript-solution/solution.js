const operations = {
  '+': (n1, n2) => n1 + n2,
  '-': (n1, n2) => n1 - n2,
  '*': (n1, n2) => n1 * n2,
  '/': (n1, n2) => n1 / n2
}

function solution(value) {
  if (value.length === 0) {
    return 0
  }

  const stack = []
  const values = value.split(' ')
  values.forEach((value) => {
    const number = Number(value)
    if (!isNaN(number)) {
      stack.push(number)
    } else if (operations.hasOwnProperty(value)) {
      const number1 = stack.pop()
      const number2 = stack.pop()
      const operation = operations[value]
      const result = operation(number2, number1)
      stack.push(result)
    }
  })

  return stack.pop()
}

module.exports = solution
