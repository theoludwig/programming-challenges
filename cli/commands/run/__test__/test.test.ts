import { PassThrough } from 'node:stream'

import chalk from 'chalk'

import { cli } from '../../../cli.js'
import { Test } from '../../../services/Test.js'

const input = ['run', 'test']
const challenge = 'hello-world'
const language = 'c'
const solution = 'function'
const inputChallenge = `--challenge=${challenge}`
const inputLanguage = `--language=${language}`
const inputSolution = `--solution=${solution}`

describe('programming-challenges run test', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('succeeds', async () => {
    console.log = jest.fn()
    const stream = new PassThrough()
    const exitCode = await cli.run(
      [...input, inputChallenge, inputSolution, inputLanguage],
      {
        stdin: process.stdin,
        stdout: stream,
        stderr: stream
      }
    )
    stream.end()
    expect(exitCode).toEqual(0)
    expect(console.log).toHaveBeenNthCalledWith(2, `${chalk.bold('Name:')} ${challenge}/${language}/${solution}\n`)
    expect(console.log).toHaveBeenNthCalledWith(4, `${chalk.bold('Tests:')} ${chalk.bold.green('3 passed')}, 3 total`)
    expect(console.log).toHaveBeenNthCalledWith(6, Test.SUCCESS_MESSAGE)
  })

  it("fails with solution that doesn't exist", async () => {
    console.error = jest.fn()
    const stream = new PassThrough()
    const invalidSolution = 'invalid'
    const inputInvalidSolution = `--solution=${invalidSolution}`
    const exitCode = await cli.run(
      [...input, inputChallenge, inputInvalidSolution, inputLanguage],
      {
        stdin: process.stdin,
        stdout: stream,
        stderr: stream
      }
    )
    stream.end()
    expect(exitCode).toEqual(1)
    expect(console.error).toHaveBeenCalledWith(
      chalk.bold.red('Error:') + ' The solution was not found.'
    )
  })

  it('fails with invalid language', async () => {
    console.error = jest.fn()
    const stream = new PassThrough()
    const invalidLanguage = 'invalid'
    const inputInvalidLanguage = `--language=${invalidLanguage}`
    const exitCode = await cli.run(
      [...input, inputChallenge, inputSolution, inputInvalidLanguage],
      {
        stdin: process.stdin,
        stdout: stream,
        stderr: stream
      }
    )
    stream.end()
    expect(exitCode).toEqual(1)
    expect(console.error).toHaveBeenCalledWith(
      chalk.bold.red('Error:') + ' This programming language is not supported yet.'
    )
  })

  it('fails without options', async () => {
    console.error = jest.fn()
    const stream = new PassThrough()
    const exitCode = await cli.run(input, {
      stdin: process.stdin,
      stdout: stream,
      stderr: stream
    })
    stream.end()
    expect(exitCode).toEqual(1)
    expect(console.error).toHaveBeenCalledWith(
      `${chalk.bold.red('Error:')} You must specify all the options (\`--challenge\`, \`--solution\`,  \`--language\`).`
    )
  })
})
