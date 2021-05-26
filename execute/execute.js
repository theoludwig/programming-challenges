const path = require('path')
const fs = require('fs').promises
const solution = require('./solution')

const inputPath = path.join(__dirname, 'input.json')
const outputPath = path.join(__dirname, 'output.json')

const main = async () => {
  const inputFile = await fs.readFile(inputPath)
  const inputJSON = JSON.parse(inputFile)
  const result = solution(inputJSON)
  await fs.writeFile(outputPath, JSON.stringify(result), {
    encoding: 'utf-8'
  })
}

main()
