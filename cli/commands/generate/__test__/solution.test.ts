import { PassThrough } from 'node:stream'
import path from 'node:path'
import fs from 'node:fs'

import chalk from 'chalk'
import getStream from 'get-stream'
import fsMock from 'mock-fs'
import date from 'date-and-time'

import { cli } from '../../../cli'
import { isExistingPath } from '../../../utils/isExistingPath'

const input = ['generate', 'solution']
const githubUser = 'Divlo'
const challenge = 'hello-world'
const language = 'c'
const solution = 'new-solution'
const inputChallenge = `--challenge=${challenge}`
const inputGitHubUser = `--github-user=${githubUser}`
const inputLanguage = `--language=${language}`
const inputSolution = `--solution=${solution}`

describe('programming-challenges generate solution', () => {
  beforeEach(() => {
    fsMock(
      {
        [process.cwd()]: fsMock.load(process.cwd(), { recursive: true })
      },
      { createCwd: false }
    )
  })

  afterEach(() => {
    fsMock.restore()
    jest.clearAllMocks()
  })

  it('succeeds and generate the new solution', async () => {
    console.log = jest.fn()
    const dateString = date.format(new Date(), 'D MMMM Y', true)
    const stream = new PassThrough()
    const exitCode = await cli.run(
      [...input, inputChallenge, inputGitHubUser, inputLanguage, inputSolution],
      {
        stdin: process.stdin,
        stdout: stream,
        stderr: stream
      }
    )
    stream.end()
    expect(exitCode).toEqual(0)
    const solutionPath = path.join(process.cwd(), 'challenges', challenge, 'solutions', language, solution)
    const readmePath = path.join(solutionPath, 'README.md')
    const readmeContent = await fs.promises.readFile(readmePath, { encoding: 'utf-8' })
    const successMessage = `${chalk.bold.green('Success:')} created the new solution at ${solutionPath}.`
    expect(console.log).toHaveBeenCalledWith(successMessage)
    expect(await isExistingPath(solutionPath)).toBeTruthy()
    expect(readmeContent).toMatch(`# ${challenge}/${language}/${solution}

Created by [@${githubUser}](https://github.com/${githubUser}) on ${dateString}.
`)
  })

  it("fails with challenges that doesn't exist", async () => {
    console.error = jest.fn()
    const stream = new PassThrough()
    const invalidChallenge = 'aaa-jest-challenge'
    const inputInvalidChallenge = `--challenge=${invalidChallenge}`
    const exitCode = await cli.run(
      [...input, inputInvalidChallenge, inputGitHubUser, inputLanguage, inputSolution],
      {
        stdin: process.stdin,
        stdout: stream,
        stderr: stream
      }
    )
    stream.end()
    expect(exitCode).toEqual(1)
    expect(console.error).toHaveBeenCalledWith(
      chalk.bold.red('Error:') + ` The challenge doesn't exist yet: ${invalidChallenge}.`
    )
  })

  it('fails with solution that already exist', async () => {
    console.error = jest.fn()
    const stream = new PassThrough()
    const invalidSolution = 'function'
    const inputInvalidSolution = `--solution=${invalidSolution}`
    const exitCode = await cli.run(
      [...input, inputChallenge, inputGitHubUser, inputLanguage, inputInvalidSolution],
      {
        stdin: process.stdin,
        stdout: stream,
        stderr: stream
      }
    )
    stream.end()
    expect(exitCode).toEqual(1)
    expect(console.error).toHaveBeenCalledWith(
      chalk.bold.red('Error:') + ` The solution already exists: ${invalidSolution}.`
    )
  })

  it('fails with invalid language', async () => {
    console.error = jest.fn()
    const stream = new PassThrough()
    const invalidLanguage = 'invalid'
    const inputInvalidLanguage = `--language=${invalidLanguage}`
    const exitCode = await cli.run(
      [...input, inputChallenge, inputGitHubUser, inputSolution, inputInvalidLanguage],
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
    const stream = new PassThrough()
    const promise = getStream(stream)
    const exitCode = await cli.run(input, {
      stdin: process.stdin,
      stdout: stream,
      stderr: stream
    })
    stream.end()
    expect(exitCode).toEqual(1)
    const output = await promise
    expect(output).toContain('Unknown Syntax Error')
  })
})
