import path from 'path'
import * as fsWithCallbacks from 'fs'
import solution from './solution'

const fs = fsWithCallbacks.promises
const inputPath = path.join(__dirname, 'input.json')
const outputPath = path.join(__dirname, 'output.json')

const main = async (): Promise<void> => {
  const inputFile = await fs.readFile(inputPath, { encoding: 'utf-8' })
  const inputJSON = JSON.parse(inputFile.toString())
  const result = solution(inputJSON)
  await fs.writeFile(outputPath, JSON.stringify(result), {
    encoding: 'utf-8'
  })
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
