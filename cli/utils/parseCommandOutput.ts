export const parseCommandOutput = (output: string): string[] => {
  return output
    .split('\n')
    .map((line) => {
      return line.trim()
    })
    .filter((line) => {
      return line.length > 0
    })
}
