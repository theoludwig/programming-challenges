function solution (counter: number, result: number[] = [], number1: number = 0, number2: number = 1): number[] {
  if (counter === 0) return result 
  counter--
  result.push(number1)
  return solution(counter, result, number2, number1 + number2)
}

export default solution
