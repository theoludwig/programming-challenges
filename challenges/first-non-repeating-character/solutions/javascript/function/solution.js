import readline from "node:readline"

const input = []
const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
readlineInterface.on("line", (value) => {
  input.push(value)
})
readlineInterface.on("close", solution)

const firstNonRepeatingCharacter = (string) => {
  const lettersCount = {}
  for (let index = 0; index < string.length; index++) {
    const character = string[index]
    if (lettersCount[character] == null) {
      lettersCount[character] = {
        total: 1,
        firstIndex: index,
        value: character,
      }
    } else {
      lettersCount[character].total += 1
    }
  }
  let result = null
  for (const character in lettersCount) {
    const characterObject = lettersCount[character]
    if (characterObject.total === 1) {
      if (result == null) {
        result = characterObject
      } else if (characterObject.firstIndex < result.firstIndex) {
        result = characterObject
      }
    }
  }
  if (result == null) {
    return ""
  }
  return result.value
}

function solution() {
  console.log(firstNonRepeatingCharacter(input[0]))
}
