import readline from 'readline'

const removeByIndex = <T = any>(array: T[], index: number): T[] => {
  const result = [...array]
  result.splice(index, 1)
  return result
}

type TriangleType = 'impossible' | 'equilateral' | 'isosceles' | 'scalene'

class Triangle {
  public sides: number[]
  public type: TriangleType

  constructor(sides: number[]) {
    this.sides = sides
    this.type = this.getType()
  }

  private getType(): TriangleType {
    const largestSide = Math.max(...this.sides)
    const largestSideIndex = this.sides.findIndex((side) => side === largestSide)
    const otherSides = removeByIndex(this.sides, largestSideIndex)
    const isImpossible = otherSides[0] + otherSides[1] < largestSide
    if (isImpossible) {
      return 'impossible'
    }
    const uniqueSides = [...new Set(this.sides)]
    const isEquilateral = uniqueSides.length === 1
    const isIsocseles = uniqueSides.length === 2
    if (isEquilateral) {
      return 'equilateral'
    }
    if (isIsocseles) {
      return 'isosceles'
    }
    return 'scalene'
  }
}

const triangleSides: number[] = []
const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
readlineInterface.on('line', (value) => {
  triangleSides.push(Number(value))
})
readlineInterface.on('close', solution)

function solution(): void {
  const triangle = new Triangle(triangleSides)
  console.log(triangle.type)
}
