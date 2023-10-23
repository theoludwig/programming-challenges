/**
 *
 * @param {string} string
 * @returns {number}
 */
export const getMaximumFrequencyDeviation = (string) => {
  /** @type {string[]} */
  const subStrings = []
  for (let index = 0; index < string.length; index++) {
    let subString = ""
    for (let subIndex = index; subIndex < string.length; subIndex++) {
      subString += string[subIndex]
      subStrings.push(subString)
    }
  }

  let maximumFrequencyDeviation = 0
  for (const subString of subStrings) {
    /**
     * @type {Map<string, number>}
     *
     * @description
     * - Key: Character in the string
     * - Value: Number of occurrences of the character in the string
     */
    const map = new Map()
    for (let index = 0; index < subString.length; index++) {
      const character = subString[index]
      if (map.has(character)) {
        map.set(character, map.get(character) + 1)
      } else {
        map.set(character, 1)
      }
    }

    let minimumFrequence = Number.MAX_VALUE
    let maximumFrequence = 0
    for (const [_, value] of map) {
      if (value > maximumFrequence) {
        maximumFrequence = value
      }

      if (value < minimumFrequence) {
        minimumFrequence = value
      }
    }
    const frequencyDeviation = maximumFrequence - minimumFrequence

    if (frequencyDeviation > maximumFrequencyDeviation) {
      maximumFrequencyDeviation = frequencyDeviation
    }
  }

  return maximumFrequencyDeviation
}
