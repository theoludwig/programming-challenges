import readline from 'node:readline'

const input: string[] = []
const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
readlineInterface.on('line', (value) => {
  input.push(value)
})
readlineInterface.on('close', solution)

interface AssignmentValues {
  [key: string]: number
}

interface Assignments {
  [key: string]: AssignmentArray
}

class AssignmentArray {
  public identifier: string
  public firstIndex: number
  public lastIndex: number
  public values: AssignmentValues

  constructor(assignment: string) {
    const [identifier, rest] = assignment.split('[')
    const [indexes, valuesString] = rest.split(']')
    const [firstIndexString, lastIndexString] = indexes.split('..')
    const firstIndex = parseInt(firstIndexString)
    const lastIndex = parseInt(lastIndexString)

    const [, numbersString] = valuesString.split('=')
    const numbersStringArray = numbersString.trim().split(' ')
    const numbers = numbersStringArray.map((number) => Number(number))
    const values: AssignmentValues = {}
    let index = 0
    for (
      let virtualIndex = firstIndex;
      virtualIndex <= lastIndex;
      virtualIndex++
    ) {
      values[virtualIndex] = numbers[index]
      index++
    }

    this.identifier = identifier
    this.firstIndex = firstIndex
    this.lastIndex = lastIndex
    this.values = values
  }

  public getByIndex(index: number): number {
    return this.values[index]
  }
}

function solution(): void {
  const assignments: Assignments = {}
  const assignmentsLength = parseInt(input[0])
  let assignmentIndex = 0
  for (
    assignmentIndex = 0;
    assignmentIndex < assignmentsLength;
    assignmentIndex++
  ) {
    const assignment = input[assignmentIndex + 1]
    const assignmentArray = new AssignmentArray(assignment)
    assignments[assignmentArray.identifier] = assignmentArray
  }
  const operation = input[assignmentIndex + 1]
  const [simplifiedOperation] = operation.split(']')
  const nested = simplifiedOperation.split('[')
  const lastOperationIndex = nested.length - 1
  const operationIdentifiers = nested.slice(0, lastOperationIndex)
  const operationIndex = parseInt(nested[lastOperationIndex])
  let currentValue: number | null = null
  for (let index = operationIdentifiers.length - 1; index >= 0; index--) {
    const currentIdentifier = operationIdentifiers[index]
    if (currentValue == null) {
      currentValue = assignments[currentIdentifier].getByIndex(operationIndex)
    } else {
      currentValue = assignments[currentIdentifier].getByIndex(currentValue)
    }
  }
  console.log(currentValue)
}
