import { PassThrough } from 'node:stream'
import path from 'node:path'
import fs from 'node:fs'

import chalk from 'chalk'
import getStream from 'get-stream'
import fsMock from 'mock-fs'
import date from 'date-and-time'

import { cli } from '../../../cli.js'
import { isExistingPath } from '../../../utils/isExistingPath.js'

const input = ['generate', 'challenge']
const githubUser = 'Divlo'
const challenge = 'aaaa-test-jest'
const inputChallenge = `--challenge=${challenge}`
const inputGitHubUser = `--github-user=${githubUser}`

describe('programming-challenges generate challenge', () => {
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

  it('succeeds and generate the new challenge', async () => {
    console.log = jest.fn()
    const dateString = date.format(new Date(), 'D MMMM Y', true)
    const stream = new PassThrough()
    const exitCode = await cli.run(
      [...input, inputChallenge, inputGitHubUser],
      {
        stdin: process.stdin,
        stdout: stream,
        stderr: stream
      }
    )
    stream.end()
    expect(exitCode).toEqual(0)
    const challengePath = path.join(process.cwd(), 'challenges', challenge)
    const readmePath = path.join(challengePath, 'README.md')
    const readmeContent = await fs.promises.readFile(readmePath, { encoding: 'utf-8' })
    const successMessage = `${chalk.bold.green('Success:')} created the new challenge at ${challengePath}.`
    expect(console.log).toHaveBeenCalledWith(successMessage)
    expect(await isExistingPath(challengePath)).toBeTruthy()
    expect(readmeContent).toMatch(`# ${challenge}

Created by [@${githubUser}](https://github.com/${githubUser}) on ${dateString}.

## Instructions

Description of the challenge...

## Examples

See the \`test\` folder for examples of input/output.
`)
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

  it('fails with already existing challenge', async () => {
    console.error = jest.fn()
    const stream = new PassThrough()
    const exitCode = await cli.run(
      [...input, '--challenge=hello-world', inputGitHubUser],
      {
        stdin: process.stdin,
        stdout: stream,
        stderr: stream
      }
    )
    expect(console.error).toHaveBeenCalledWith(
      `${chalk.bold.red('Error:')} The challenge already exists: hello-world.`
    )
    stream.end()
    expect(exitCode).toEqual(1)
  })

  it('fails with invalid challenge name', async () => {
    console.error = jest.fn()
    const stream = new PassThrough()
    const exitCode = await cli.run(
      [...input, '--challenge=hEllO-world', inputGitHubUser],
      {
        stdin: process.stdin,
        stdout: stream,
        stderr: stream
      }
    )
    stream.end()
    expect(exitCode).toEqual(1)
    expect(console.error).toHaveBeenCalledWith(
      `${chalk.bold.red('Error:')} Invalid challenge name.`
    )
  })
})
