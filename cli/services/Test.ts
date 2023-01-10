import fs from 'node:fs'
import path from 'node:path'
import { performance } from 'node:perf_hooks'

import type { Solution } from './Solution.js'
import { docker } from './Docker.js'
import { SolutionTestsResult } from './SolutionTestsResult.js'
import { TemporaryFolder } from './TemporaryFolder.js'

export interface InputOutput {
  input: string
  output: string
}

export interface TestRunOptions {
  testNumber: number
  path: string
  solution: Solution
}

export interface TestOptions {
  testNumber: number
  path: string
  isSuccess: boolean
  input: string
  output: string
  stdout: string
}

export class Test implements TestOptions {
  public testNumber: number
  public path: string
  public isSuccess: boolean
  public input: string
  public output: string
  public stdout: string

  constructor(options: TestOptions) {
    this.testNumber = options.testNumber
    this.path = options.path
    this.isSuccess = options.isSuccess
    this.input = options.input
    this.output = options.output
    this.stdout = options.stdout
  }

  static async runAll(solution: Solution): Promise<SolutionTestsResult> {
    const testsPath = path.join(solution.challenge.path, 'test')
    const testsFolders = await fs.promises.readdir(testsPath)
    const testsNumbers = testsFolders.map((test) => {
      return Number(test)
    })
    const testsPromises: Array<Promise<Test>> = []
    const start = performance.now()
    for (const testNumber of testsNumbers) {
      const testPath = path.join(testsPath, testNumber.toString())
      testsPromises.push(Test.run({ testNumber, path: testPath, solution }))
    }
    const tests = await Promise.all(testsPromises)
    const end = performance.now()
    const elapsedTimeMilliseconds = end - start
    return new SolutionTestsResult({ solution, tests, elapsedTimeMilliseconds })
  }

  static async getInputOutput(testPath: string): Promise<InputOutput> {
    const inputPath = path.join(testPath, 'input.txt')
    const outputPath = path.join(testPath, 'output.txt')
    const input = await fs.promises.readFile(inputPath, { encoding: 'utf-8' })
    const output = await fs.promises.readFile(outputPath, {
      encoding: 'utf-8'
    })
    return { input, output }
  }

  static async runManyWithSolutions(solutions: Solution[]): Promise<number> {
    const solutionTestsResultsPromises: Array<Promise<SolutionTestsResult>> = []
    let isSolutionSuccess = true
    for (const solution of solutions) {
      const solutionTestsResultPromise = solution.test()
      solutionTestsResultsPromises.push(solutionTestsResultPromise)
      solutionTestsResultPromise
        .then((solutionTestsResult) => {
          solutionTestsResult.print()
          if (!solutionTestsResult.isSuccess) {
            isSolutionSuccess = false
          }
        })
        .catch(() => {})
    }
    await Promise.all(solutionTestsResultsPromises)
    await TemporaryFolder.cleanAll()
    if (isSolutionSuccess) {
      console.log(SolutionTestsResult.SUCCESS_MESSAGE)
      return 0
    }
    return 1
  }

  static async run(options: TestRunOptions): Promise<Test> {
    const { input, output } = await Test.getInputOutput(options.path)
    try {
      const { stdout } = await docker.run(
        input,
        options.solution.temporaryFolder.id
      )
      const test = new Test({
        path: options.path,
        testNumber: options.testNumber,
        input,
        output,
        stdout,
        isSuccess: stdout === output
      })
      return test
    } catch (error: any) {
      throw new Error(
        `solution: ${options.solution.path}\n${error.message as string}\n`
      )
    }
  }
}
