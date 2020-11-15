import path from 'path'
import * as fsWithCallbacks from 'fs'
// @ts-ignore
import solution from './solution'

const fs = fsWithCallbacks.promises
const inputPath = path.join(__dirname, 'input.json')
const outputPath = path.join(__dirname, 'output.json')

const main = async () => {
  const inputFile = await fs.readFile(inputPath)
  const inputJSON = JSON.parse(inputFile.toString())

  try {
    const result = solution.apply(null, inputJSON)
    await fs.writeFile(outputPath, JSON.stringify(result))
  } catch (error) {
    console.error(error)
  }
}

main()
