const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

interface ShiftedLetter {
  origin: string
  shifted: string
}

function shiftAlphabet (shift: number): ShiftedLetter[] {
  const result: ShiftedLetter[] = []
  for (let index = 0; index < alphabet.length; index++) {
    const letter = alphabet[index]
    let shiftedIndex = index + shift
    if (shiftedIndex > alphabet.length - 1) {
      shiftedIndex = Math.abs(alphabet.length - shiftedIndex)
    }
    result.push({
      origin: letter,
      shifted: alphabet[shiftedIndex]
    })
  }
  return result
}

function solution (str: string, shift: number): string {
  const shiftedAlphabet = shiftAlphabet(shift)
  let result = ''
  for (const letter of str) {
    if (letter === ' ') {
      result += ' '
    } else {
      for (const { origin, shifted } of shiftedAlphabet) {
        if (letter === shifted) {
          result += origin
          break
        }
      }
    }
  }
  return result
}

export default solution
