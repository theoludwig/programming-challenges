function solution (string: string) {
  const formattedString = string.replace(/ /g,'').toLowerCase()
  return formattedString === formattedString.split("").reverse().join('')
}

export default solution
