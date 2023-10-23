import test from "node:test"
import assert from "node:assert/strict"
import { PassThrough } from "node:stream"
import path from "node:path"

import sinon from "sinon"
import chalk from "chalk"

import { cli } from "../../../cli.js"

const input = ["run", "solution"]
const challenge = "hello-world"
const language = "c"
const solution = "function"
const inputPath = path.join(
  process.cwd(),
  "challenges",
  challenge,
  "test",
  "1",
  "input.txt",
)
const inputChallenge = `--challenge=${challenge}`
const inputLanguage = `--language=${language}`
const inputSolution = `--solution=${solution}`
const inputInputPath = `--input-path=${inputPath}`

await test("programming-challenges run solution", async (t) => {
  t.afterEach(() => {
    sinon.restore()
  })

  await t.test("succeeds", async () => {
    sinon.stub(console, "log").value(() => {})
    const consoleLogSpy = sinon.spy(console, "log")
    const stream = new PassThrough()
    const exitCode = await cli.run(
      [
        ...input,
        inputChallenge,
        inputSolution,
        inputLanguage,
        inputInputPath,
        "--output",
      ],
      {
        stdin: process.stdin,
        stdout: stream,
        stderr: stream,
      },
    )
    stream.end()
    assert.strictEqual(exitCode, 0)
    assert.strictEqual(consoleLogSpy.calledWith(`Hello, world!`), true)
  })

  await t.test("fails with solution that doesn't exist", async () => {
    sinon.stub(console, "error").value(() => {})
    const consoleErrorSpy = sinon.spy(console, "error")
    const stream = new PassThrough()
    const invalidSolution = "invalid"
    const inputInvalidSolution = `--solution=${invalidSolution}`
    const exitCode = await cli.run(
      [
        ...input,
        inputChallenge,
        inputInvalidSolution,
        inputLanguage,
        inputInputPath,
      ],
      {
        stdin: process.stdin,
        stdout: stream,
        stderr: stream,
      },
    )
    stream.end()
    assert.strictEqual(exitCode, 1)
    assert.strictEqual(
      consoleErrorSpy.calledWith(
        chalk.bold.red("Error:") + " The solution was not found.",
      ),
      true,
    )
  })

  await t.test("fails with invalid language", async () => {
    sinon.stub(console, "error").value(() => {})
    const consoleErrorSpy = sinon.spy(console, "error")
    const stream = new PassThrough()
    const invalidLanguage = "invalid"
    const inputInvalidLanguage = `--language=${invalidLanguage}`
    const exitCode = await cli.run(
      [
        ...input,
        inputChallenge,
        inputSolution,
        inputInvalidLanguage,
        inputInputPath,
      ],
      {
        stdin: process.stdin,
        stdout: stream,
        stderr: stream,
      },
    )
    stream.end()
    assert.strictEqual(exitCode, 1)
    assert.strictEqual(
      consoleErrorSpy.calledWith(
        chalk.bold.red("Error:") +
          " This programming language is not supported yet.",
      ),
      true,
    )
  })

  await t.test("fails with invalid `input-path`", async () => {
    sinon.stub(console, "error").value(() => {})
    const consoleErrorSpy = sinon.spy(console, "error")
    const stream = new PassThrough()
    const invalidInputPath = "invalid"
    const inputInvalidInputPath = `--input-path=${invalidInputPath}`
    const inputPath = path.resolve(process.cwd(), invalidInputPath)
    const exitCode = await cli.run(
      [
        ...input,
        inputChallenge,
        inputSolution,
        inputLanguage,
        inputInvalidInputPath,
      ],
      {
        stdin: process.stdin,
        stdout: stream,
        stderr: stream,
      },
    )
    stream.end()
    assert.strictEqual(exitCode, 1)
    assert.strictEqual(
      consoleErrorSpy.calledWith(
        chalk.bold.red("Error:") +
          ` The \`input-path\` doesn't exist: ${inputPath}.`,
      ),
      true,
    )
  })
})
