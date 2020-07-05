function solution (string: string) {
  return string.length === 0
    ? ''
    : string
        .trim()
        .split(' ')
        .map((word, index) => {
          if (index === 0) return word
          return word[0].toUpperCase() + word.slice(1)
        })
        .join('')
}

export default solution
