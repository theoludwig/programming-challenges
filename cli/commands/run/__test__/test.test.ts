import test from 'node:test'
import assert from 'node:assert/strict'
import { PassThrough } from 'node:stream'

import sinon from 'sinon'
import chalk from 'chalk'

import { cli } from '../../../cli.js'
import { SolutionTestsResult } from '../../../services/SolutionTestsResult.js'

const input = ['run', 'test']
const challenge = 'hello-world'
const language = 'c'
const solution = 'function'
const inputChallenge = `--challenge=${challenge}`
const inputLanguage = `--language=${language}`
const inputSolution = `--solution=${solution}`

await test('programming-challenges run test', async (t) => {
  t.afterEach(() => {
    sinon.restore()
  })

  await t.test('succeeds', async () => {
    sinon.stub(console, 'log').value(() => {})
    const consoleLogSpy = sinon.spy(console, 'log')
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
    assert.strictEqual(exitCode, 0)
    assert.strictEqual(
      consoleLogSpy.calledWith(
        `${chalk.bold('Name:')} ${challenge}/${language}/${solution}\n`
      ),
      true
    )
    assert.strictEqual(
      consoleLogSpy.calledWith(
        `${chalk.bold('Tests:')} ${chalk.bold.green('3 passed')}, 3 total`
      ),
      true
    )
    assert.strictEqual(
      consoleLogSpy.calledWith(SolutionTestsResult.SUCCESS_MESSAGE),
      true
    )
  })

  await t.test("fails with solution that doesn't exist", async () => {
    sinon.stub(console, 'error').value(() => {})
    const consoleErrorSpy = sinon.spy(console, 'error')
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
    assert.strictEqual(exitCode, 1)
    assert.strictEqual(
      consoleErrorSpy.calledWith(
        chalk.bold.red('Error:') + ' The solution was not found.'
      ),
      true
    )
  })

  await t.test('fails with invalid language', async () => {
    sinon.stub(console, 'error').value(() => {})
    const consoleErrorSpy = sinon.spy(console, 'error')
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
    assert.strictEqual(exitCode, 1)
    assert.strictEqual(
      consoleErrorSpy.calledWith(
        chalk.bold.red('Error:') +
          ' This programming language is not supported yet.'
      ),
      true
    )
  })

  await t.test('fails without options', async () => {
    sinon.stub(console, 'error').value(() => {})
    const consoleErrorSpy = sinon.spy(console, 'error')
    const stream = new PassThrough()
    const exitCode = await cli.run(input, {
      stdin: process.stdin,
      stdout: stream,
      stderr: stream
    })
    stream.end()
    assert.strictEqual(exitCode, 1)
    assert.strictEqual(
      consoleErrorSpy.calledWith(
        `${chalk.bold.red(
          'Error:'
        )} You must specify all the options (\`--challenge\`, \`--solution\`,  \`--language\`).`
      ),
      true
    )
  })
})
