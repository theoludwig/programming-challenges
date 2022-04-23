import { PassThrough } from 'node:stream'
import path from 'node:path'
import fs from 'node:fs'

import tap from 'tap'
import sinon from 'sinon'
import fsMock from 'mock-fs'
import chalk from 'chalk'
import getStream from 'get-stream'
import date from 'date-and-time'

import { cli } from '../../../cli.js'
import { isExistingPath } from '../../../utils/isExistingPath.js'

const input = ['generate', 'solution']
const githubUser = 'Divlo'
const challenge = 'hello-world'
const language = 'c'
const solution = 'new-solution'
const inputChallenge = `--challenge=${challenge}`
const inputGitHubUser = `--github-user=${githubUser}`
const inputLanguage = `--language=${language}`
const inputSolution = `--solution=${solution}`

await tap.test('programming-challenges generate solution', async (t) => {
  t.beforeEach(() => {
    fsMock(
      {
        [process.cwd()]: fsMock.load(process.cwd(), { recursive: true })
      },
      { createCwd: false }
    )
  })

  t.afterEach(() => {
    fsMock.restore()
    sinon.restore()
  })

  await t.test('succeeds and generate the new solution', async (t) => {
    sinon.stub(console, 'log').value(() => {})
    const consoleLogSpy = sinon.spy(console, 'log')
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
    t.equal(exitCode, 0)
    const solutionPath = path.join(
      process.cwd(),
      'challenges',
      challenge,
      'solutions',
      language,
      solution
    )
    const readmePath = path.join(solutionPath, 'README.md')
    const readmeContent = await fs.promises.readFile(readmePath, {
      encoding: 'utf-8'
    })
    const successMessage = `${chalk.bold.green(
      'Success:'
    )} created the new solution at ${solutionPath}.`
    t.equal(consoleLogSpy.calledWith(successMessage), true)
    t.equal(await isExistingPath(solutionPath), true)
    t.equal(
      readmeContent,
      `# ${challenge}/${language}/${solution}

Created by [@${githubUser}](https://github.com/${githubUser}) on ${dateString}.
`
    )
  })

  await t.test("fails with challenges that doesn't exist", async (t) => {
    sinon.stub(console, 'error').value(() => {})
    const consoleErrorSpy = sinon.spy(console, 'error')
    const stream = new PassThrough()
    const invalidChallenge = 'aaa-jest-challenge'
    const inputInvalidChallenge = `--challenge=${invalidChallenge}`
    const exitCode = await cli.run(
      [
        ...input,
        inputInvalidChallenge,
        inputGitHubUser,
        inputLanguage,
        inputSolution
      ],
      {
        stdin: process.stdin,
        stdout: stream,
        stderr: stream
      }
    )
    stream.end()
    t.equal(exitCode, 1)
    t.equal(
      consoleErrorSpy.calledWith(
        chalk.bold.red('Error:') +
          ` The challenge doesn't exist yet: ${invalidChallenge}.`
      ),
      true
    )
  })

  await t.test('fails with solution that already exist', async (t) => {
    sinon.stub(console, 'error').value(() => {})
    const consoleErrorSpy = sinon.spy(console, 'error')
    const stream = new PassThrough()
    const invalidSolution = 'function'
    const inputInvalidSolution = `--solution=${invalidSolution}`
    const exitCode = await cli.run(
      [
        ...input,
        inputChallenge,
        inputGitHubUser,
        inputLanguage,
        inputInvalidSolution
      ],
      {
        stdin: process.stdin,
        stdout: stream,
        stderr: stream
      }
    )
    stream.end()
    t.equal(exitCode, 1)
    t.equal(
      consoleErrorSpy.calledWith(
        chalk.bold.red('Error:') +
          ` The solution already exists: ${invalidSolution}.`
      ),
      true
    )
  })

  await t.test('fails with invalid language', async (t) => {
    sinon.stub(console, 'error').value(() => {})
    const consoleErrorSpy = sinon.spy(console, 'error')
    const stream = new PassThrough()
    const invalidLanguage = 'invalid'
    const inputInvalidLanguage = `--language=${invalidLanguage}`
    const exitCode = await cli.run(
      [
        ...input,
        inputChallenge,
        inputGitHubUser,
        inputSolution,
        inputInvalidLanguage
      ],
      {
        stdin: process.stdin,
        stdout: stream,
        stderr: stream
      }
    )
    stream.end()
    t.equal(exitCode, 1)
    t.equal(
      consoleErrorSpy.calledWith(
        chalk.bold.red('Error:') +
          ' This programming language is not supported yet.'
      ),
      true
    )
  })

  await t.test('fails without options', async () => {
    const stream = new PassThrough()
    const promise = getStream(stream)
    const exitCode = await cli.run(input, {
      stdin: process.stdin,
      stdout: stream,
      stderr: stream
    })
    stream.end()
    t.equal(exitCode, 1)
    const output = await promise
    t.match(output, 'Unknown Syntax Error')
  })
})
