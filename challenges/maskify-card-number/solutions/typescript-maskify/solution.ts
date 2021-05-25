function solution(string: string): string {
  return string
    .split('')
    .map((character, index) => {
      if (string.length - 4 > index) return '#'
      return character
    })
    .join('')
}

export default solution
