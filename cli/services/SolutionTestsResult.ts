import logSymbols from 'log-symbols'
import chalk from 'chalk'
import { table } from 'table'

import type { Solution } from './Solution.js'
import type { Test } from './Test.js'

export interface SolutionTestsResultOptions {
  tests: Test[]
  solution: Solution
  elapsedTimeMilliseconds: number
}

export interface SolutionTestsResultPrintOptions {
  shouldPrintBenchmark?: boolean
  shouldPrintTableResult?: boolean
}

export class SolutionTestsResult implements SolutionTestsResultOptions {
  public tests: Test[] = []
  public solution: Solution
  public isSuccess: boolean
  public elapsedTimeMilliseconds: number
  public static readonly SUCCESS_MESSAGE = `${chalk.bold.green(
    'Success:'
  )} Tests passed! 🎉`

  constructor(options: SolutionTestsResultOptions) {
    this.tests = options.tests.sort((a, b) => {
      return a.testNumber - b.testNumber
    })
    this.solution = options.solution
    this.isSuccess = this.tests.every((test) => {
      return test.isSuccess
    })
    this.elapsedTimeMilliseconds = options.elapsedTimeMilliseconds
  }

  public print(options: SolutionTestsResultPrintOptions = {}): void {
    const { shouldPrintBenchmark = false, shouldPrintTableResult = false } = options
    const name = `${this.solution.challenge.name}/${this.solution.programmingLanguageName}/${this.solution.name}`
    console.log(`${chalk.bold('Name:')} ${name}\n`)
    const tableResult = [
      [
        chalk.bold('N°'),
        chalk.bold('Input'),
        chalk.bold('Expected'),
        chalk.bold('Received')
      ]
    ]
    let totalFailedTests = 0
    let totalCorrectTests = 0
    for (const test of this.tests) {
      const testLabel = `Test n°${test.testNumber}`
      if (test.isSuccess) {
        console.log(logSymbols.success, testLabel)
        totalCorrectTests += 1
      } else {
        console.log(logSymbols.error, testLabel)
        const expected = test.output.split('\n').join('\n')
        const received = test.stdout.split('\n').join('\n')
        tableResult.push([
          test.testNumber.toString(),
          `"${test.input}"`,
          `"${expected}"`,
          `"${received}"`
        ])
        totalFailedTests += 1
      }
    }
    const isSuccess = totalCorrectTests === this.tests.length
    console.log()
    if (!isSuccess && shouldPrintTableResult) {
      console.log(table(tableResult))
    }
    const testsResult = isSuccess
      ? chalk.bold.green(`${totalCorrectTests} passed`)
      : chalk.bold.red(`${totalFailedTests} failed`)
    console.log(
      `${chalk.bold('Tests:')} ${testsResult}, ${this.tests.length} total`
    )
    if (shouldPrintBenchmark) {
      SolutionTestsResult.printBenchmark(this.elapsedTimeMilliseconds)
    }
    if (!isSuccess) {
      throw new Error('Tests failed, try again!')
    }
    console.log('\n------------------------------\n')
  }

  public static printBenchmark(elapsedTimeMilliseconds: number): void {
    const elapsedTime = elapsedTimeMilliseconds / 1000
    console.log(`${chalk.bold('Benchmark:')} ${elapsedTime} seconds`)
  }
}
