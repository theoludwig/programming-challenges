import fs from 'node:fs'
import path from 'node:path'

import ora from 'ora'
import chalk from 'chalk'
import { table } from 'table'

import { Solution } from './Solution.js'
import { docker } from './Docker.js'

export interface InputOutput {
  input: string
  output: string
}

export interface TestRunOptions {
  index: number
  path: string
}

export interface TestOptions {
  index: number
  path: string
  isSuccess: boolean
  input: string
  output: string
  stdout: string
  elapsedTimeMilliseconds: number
}

export class Test implements TestOptions {
  public index: number
  public path: string
  public isSuccess: boolean
  public input: string
  public output: string
  public stdout: string
  public elapsedTimeMilliseconds: number
  static SUCCESS_MESSAGE = `${chalk.bold.green('Success:')} Tests passed! 🎉`

  constructor(options: TestOptions) {
    this.index = options.index
    this.path = options.path
    this.isSuccess = options.isSuccess
    this.input = options.input
    this.output = options.output
    this.stdout = options.stdout
    this.elapsedTimeMilliseconds = options.elapsedTimeMilliseconds
  }

  static printResult(tests: Test[]): void {
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
    let totalElapsedTimeMilliseconds = 0
    for (const test of tests) {
      if (!test.isSuccess) {
        const expected = test.output.split('\n').join('"\n"')
        const received = test.stdout.split('\n').join('"\n"')
        tableResult.push([
          test.index.toString(),
          `"${test.input}"`,
          `"${expected}"`,
          `"${received}"`
        ])
        totalFailedTests += 1
      } else {
        totalCorrectTests += 1
      }
      totalElapsedTimeMilliseconds += test.elapsedTimeMilliseconds
    }
    const isSuccess = totalCorrectTests === tests.length
    if (isSuccess) {
      console.log()
    } else {
      console.log()
      console.log(table(tableResult))
    }
    const testsResult = isSuccess
      ? chalk.bold.green(`${totalCorrectTests} passed`)
      : chalk.bold.red(`${totalFailedTests} failed`)
    console.log(`${chalk.bold('Tests:')} ${testsResult}, ${tests.length} total`)
    Test.printBenchmark(totalElapsedTimeMilliseconds)
    if (!isSuccess) {
      throw new Error('Tests failed, try again!')
    }
  }

  static printBenchmark(elapsedTimeMilliseconds: number): void {
    const elapsedTime = elapsedTimeMilliseconds / 1000
    console.log(`${chalk.bold('Benchmark:')} ${elapsedTime} seconds`)
  }

  static async runAll(solution: Solution): Promise<void> {
    const name = `${solution.challenge.name}/${solution.programmingLanguageName}/${solution.name}`
    const testsPath = path.join(solution.challenge.path, 'test')
    const testsFolders = await fs.promises.readdir(testsPath)
    const testsNumbers = testsFolders
      .map((test) => Number(test))
      .sort((a, b) => a - b)
    const tests: Test[] = []
    console.log(`${chalk.bold('Name:')} ${name}\n`)
    for (const testNumber of testsNumbers) {
      const loader = ora(`Test n°${testNumber}`).start()
      try {
        const test = await Test.run({
          path: path.join(testsPath, testNumber.toString()),
          index: testNumber
        })
        tests.push(test)
        if (test.isSuccess) {
          loader.succeed()
        } else {
          loader.fail()
        }
      } catch (error) {
        loader.fail()
        throw error
      }
    }
    Test.printResult(tests)
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
    for (const solution of solutions) {
      await solution.test()
      console.log('\n------------------------------\n')
    }
    console.log(Test.SUCCESS_MESSAGE)
    return 0
  }

  static async runAllTests(programmingLanguage?: string): Promise<number> {
    const solutions = await Solution.getManyByProgrammingLanguages(
      programmingLanguage != null ? [programmingLanguage] : undefined
    )
    await Test.runManyWithSolutions(solutions)
    return 0
  }

  static async run(options: TestRunOptions): Promise<Test> {
    const { input, output } = await Test.getInputOutput(options.path)
    const { stdout, elapsedTimeMilliseconds } = await docker.run(input)
    const test = new Test({
      path: options.path,
      index: options.index,
      input,
      output,
      stdout,
      isSuccess: stdout === output,
      elapsedTimeMilliseconds
    })
    return test
  }
}
