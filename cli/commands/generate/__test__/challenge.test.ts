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

const input = ['generate', 'challenge']
const githubUser = 'theoludwig'
const challenge = 'aaaa-test-jest'
const inputChallenge = `--challenge=${challenge}`
const inputGitHubUser = `--github-user=${githubUser}`

await tap.test('programming-challenges generate challenge', async (t) => {
  t.beforeEach(() => {
    fsMock(
      {
        [process.cwd()]: fsMock.load(process.cwd(), {
          recursive: true,
          lazy: true
        })
      },
      { createCwd: false }
    )
  })

  t.afterEach(() => {
    fsMock.restore()
    sinon.restore()
  })

  await t.test('succeeds and generate the new challenge', async (t) => {
    sinon.stub(console, 'log').value(() => {})
    const consoleLogSpy = sinon.spy(console, 'log')
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
    t.equal(exitCode, 0)
    const challengePath = path.join(process.cwd(), 'challenges', challenge)
    const readmePath = path.join(challengePath, 'README.md')
    const readmeContent = await fs.promises.readFile(readmePath, {
      encoding: 'utf-8'
    })
    const successMessage = `${chalk.bold.green(
      'Success:'
    )} created the new challenge at ${challengePath}.`
    t.equal(consoleLogSpy.calledWith(successMessage), true)
    t.equal(await isExistingPath(challengePath), true)
    t.equal(
      readmeContent,
      `# ${challenge}

Created by [@${githubUser}](https://github.com/${githubUser}) on ${dateString}.

## Instructions

Description of the challenge...

## Examples

See the \`test\` folder for examples of input/output.
`
    )
  })

  await t.test('fails without options', async (t) => {
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

  await t.test('fails with already existing challenge', async (t) => {
    sinon.stub(console, 'error').value(() => {})
    const consoleErrorSpy = sinon.spy(console, 'error')
    const stream = new PassThrough()
    const exitCode = await cli.run(
      [...input, '--challenge=hello-world', inputGitHubUser],
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
        `${chalk.bold.red('Error:')} The challenge already exists: hello-world.`
      ),
      true
    )
  })

  await t.test('fails with invalid challenge name', async (t) => {
    sinon.stub(console, 'error').value(() => {})
    const consoleErrorSpy = sinon.spy(console, 'error')
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
    t.equal(exitCode, 1)
    t.equal(
      consoleErrorSpy.calledWith(
        `${chalk.bold.red('Error:')} Invalid challenge name.`
      ),
      true
    )
  })
})
