import util from 'util'
import path from 'path'
import * as fsWithCallbacks from 'fs'
import childProcess from 'child_process'
import { performance } from 'perf_hooks'
import chalk from 'chalk'
import deleteAllFilesExceptOne from './utils/deleteAllFilesExceptOne'
import emoji from 'node-emoji'
import prettyMilliseconds from 'pretty-ms'
import { table } from 'table'
;(async () => {
  const fs = fsWithCallbacks.promises
  const exec = util.promisify(childProcess.exec)
  const args = process.argv.slice(2)
  const [challengeName, solutionName] = args

  if (!challengeName || !solutionName) {
    console.log(`
      Please specify the challenge and solution name:
          ${chalk.cyan(`npm run test [challenge-name] [solution-name]`)}

      For example:
          ${chalk.cyan('npm run test hello-world python-hello')}  
    `)
    process.exit(0)
  }

  const challengePath = path.resolve(
    __dirname,
    '..',
    'challenges',
    challengeName
  )
  const solutionFolderPath = path.resolve(
    challengePath,
    'solutions',
    solutionName
  )

  // Challenge valid ?
  try {
    await fs.access(challengePath)
  } catch {
    console.log(`The challenge was not found: ${chalk.red(challengeName)}`)
    process.exit(0)
  }

  // Solution valid ?
  try {
    await fs.access(solutionFolderPath)
  } catch {
    console.log(`The solution was not found: ${chalk.red(solutionName)}`)
    process.exit(0)
  }

  // Determinate the language to execute
  const solutionFilesName = await fs.readdir(solutionFolderPath)
  let solutionFilePath
  for (const solutionFileName of solutionFilesName) {
    const fileName = solutionFileName
      .split('.')
      .slice(0, -1)
      .join('.')
    if (fileName === 'solution') {
      solutionFilePath = solutionFileName
      break
    }
  }
  if (!solutionFilePath) {
    console.log(`The ${chalk.red('solution')} file was not found.`)
    process.exit(0)
  }
  const languages: {
    name: string
    extension: string
    launch: string
  }[] = require('./languages-wrapper/_languages.json')
  const extensionSolution = path.extname(solutionFilePath)
  const languageToExecute = languages.find(
    language => language.extension === extensionSolution
  )
  if (!languageToExecute) {
    console.log(`Sadly, this ${chalk.red('language')} is not supported yet.`)
    process.exit(0)
  }

  // Copy 'solution' and 'execute' files in temp
  const inputOutputJSON: { input: any[]; output: any }[] = require(path.join(
    __dirname,
    '..',
    'challenges',
    challengeName,
    'input-output.json'
  ))
  const tempPath = path.join(__dirname, '..', 'temp')
  const executeFile = `execute${languageToExecute.extension}`
  const executeLanguagePath = path.resolve(
    __dirname,
    'languages-wrapper',
    executeFile
  )
  const executeLanguageTempPath = path.join(tempPath, executeFile)
  const inputPath = path.join(tempPath, 'input.json')
  const outputPath = path.join(tempPath, 'output.json')
  await fs.copyFile(
    path.resolve(solutionFolderPath, solutionFilePath),
    path.join(tempPath, solutionFilePath)
  )
  await fs.copyFile(executeLanguagePath, executeLanguageTempPath)

  // Console.log & Tests
  const totalCorrect = {
    total: 0,
    correct: 0
  }
  const tableResult = [
    [
      chalk.cyan('Result'),
      chalk.cyan('Input'),
      chalk.cyan('Output'),
      chalk.cyan('Expected output')
    ]
  ]
  const startTest = performance.now()

  // Loop I/O
  for (const { input, output } of inputOutputJSON) {
    // Write input.json
    const inputStringify = JSON.stringify(input)
    await fs.writeFile(inputPath, inputStringify)

    // Execute script (create output.json)
    try {
      await exec(`${languageToExecute.launch} ${executeLanguageTempPath}`)
    } catch (error) {
      console.log(chalk.bgRedBright.black(error.stderr))
      await deleteAllFilesExceptOne(tempPath, '.gitignore')
      process.exit(0)
    }

    // Read output.json
    const data = await fs.readFile(outputPath)
    const outputJSON = JSON.parse(data.toString())

    // Tests
    totalCorrect.total += 1
    const outputJSONStringify = JSON.stringify(outputJSON)
    const outputStringify = JSON.stringify(output)
    const isCorrect = outputJSONStringify === outputStringify

    if (isCorrect) {
      tableResult.push([
        emoji.get('white_check_mark'),
        inputStringify,
        outputJSONStringify,
        outputStringify
      ])
      totalCorrect.correct += 1
    } else {
      tableResult.push([
        emoji.get('x'),
        inputStringify,
        outputJSONStringify,
        outputStringify
      ])
    }

    // Delete I/O file
    await fs.unlink(inputPath)
    await fs.unlink(outputPath)
  }

  const endTest = performance.now()

  console.log(
    table(tableResult, {
      columns: {
        0: { width: 6, alignment: 'center' },
        1: { width: 20, wrapWord: true },
        2: { width: 30, wrapWord: true },
        3: { width: 30, wrapWord: true }
      }
    })
  )
  console.log(`
Challenge : ${challengeName}
Solution  : ${solutionName}
Tests     : ${chalk.green(`${totalCorrect.correct} passed`)}, ${
    totalCorrect.total
  } total
Time      : ${chalk.yellow(prettyMilliseconds(endTest - startTest))}
`)

  await deleteAllFilesExceptOne(tempPath, '.gitignore')
})()
