const solution = (string: string): string => {
  return string.length === 0
    ? ''
    : string
        .trim()
        .split(' ')
        .map((word, index) => {
          const isFirstElement = index === 0
          if (isFirstElement) {
            return word
          }
          return word[0].toUpperCase() + word.slice(1)
        })
        .join('')
}

export default solution
