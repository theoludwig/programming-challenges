function solution(string: string): boolean {
  const formattedString = string.replace(/ /g, '').toLowerCase()
  return formattedString === formattedString.split('').reverse().join('')
}

export default solution
