function solution(stringsArray: string[]): string[] {
  return stringsArray.sort((a, b) => a.localeCompare(b))
}

export default solution
