const convertStringToFloat = (string: string): number => {
  return parseFloat(string.replace(',', '.'))
}

class Position {
  public longitude: number
  public latitude: number

  constructor(longitude: number, latitude: number) {
    this.longitude = this.convertDegreesToRadian(longitude)
    this.latitude = this.convertDegreesToRadian(latitude)
  }

  static distance(pointA: Position, pointB: Position): number {
    const x =
      (pointB.longitude - pointA.longitude) *
      Math.cos((pointA.latitude + pointB.latitude) / 2)
    const y = pointB.latitude - pointA.latitude
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) * 6371
  }

  private convertDegreesToRadian(degrees: number): number {
    return degrees * (Math.PI / 180)
  }
}

class Defibrillator {
  public id: string
  public name: string
  public address: string
  public position: Position
  public distance: number

  constructor(array: string[], userPosition: Position) {
    this.id = array[0]
    this.name = array[1]
    this.address = array[2]
    this.position = new Position(
      convertStringToFloat(array[array.length - 2]),
      convertStringToFloat(array[array.length - 1])
    )
    this.distance = Position.distance(this.position, userPosition)
  }
}

interface SolutionArgument {
  longitude: string
  latitude: string
  defibrillators: string[]
}

const solution = (argument: SolutionArgument): string => {
  const longitude = convertStringToFloat(argument.longitude)
  const latitude = convertStringToFloat(argument.latitude)
  const userPosition = new Position(longitude, latitude)
  const defibrillators = argument.defibrillators.map((currentLine) => {
    const line = currentLine.split(';;').join(';')
    return new Defibrillator(line.split(';'), userPosition)
  })
  let defibrillatorResult = defibrillators[0]
  for (let index = 1; index < defibrillators.length; index++) {
    if (defibrillatorResult.distance > defibrillators[index].distance) {
      defibrillatorResult = defibrillators[index]
    }
  }
  return defibrillatorResult.name
}

export default solution
