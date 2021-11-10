import fs from 'node:fs'
import path from 'node:path'
import { performance } from 'node:perf_hooks'

import ora from 'ora'
import chalk from 'chalk'
import { table } from 'table'

import { Solution } from './Solution'
import { docker } from './Docker'

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
  static successMessage = `${chalk.bold.green('Success:')} Tests passed! 🎉`

  constructor (options: TestOptions) {
    this.index = options.index
    this.path = options.path
    this.isSuccess = options.isSuccess
    this.input = options.input
    this.output = options.output
    this.stdout = options.stdout
    this.elapsedTimeMilliseconds = options.elapsedTimeMilliseconds
  }

  static async printResult (tests: Test[]): Promise<void> {
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
    const elapsedTime = totalElapsedTimeMilliseconds / 1000
    const testsResult = isSuccess
      ? chalk.bold.green(`${totalCorrectTests} passed`)
      : chalk.bold.red(`${totalFailedTests} failed`)
    console.log(`${chalk.bold('Tests:')} ${testsResult}, ${tests.length} total`)
    console.log(`${chalk.bold('Benchmark:')} ${elapsedTime} seconds`)
    if (!isSuccess) {
      throw new Error('Tests failed, try again!')
    }
  }

  static async runAll (solution: Solution): Promise<void> {
    const name = `${solution.challenge.name}/${solution.programmingLanguageName}/${solution.name}`
    const testsPath = path.join(solution.challenge.path, 'test')
    const testsFolders = await fs.promises.readdir(testsPath)
    const tests: Test[] = []
    console.log(`${chalk.bold('Name:')} ${name}\n`)
    for (let index = 0; index < testsFolders.length; index++) {
      const currentTestIndex = index + 1
      const loader = ora(`Test n°${currentTestIndex}`).start()
      try {
        const test = await Test.run({
          path: path.join(testsPath, testsFolders[index]),
          index: currentTestIndex
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
    await Test.printResult(tests)
  }

  static async getInputOutput (testPath: string): Promise<InputOutput> {
    const inputPath = path.join(testPath, 'input.txt')
    const outputPath = path.join(testPath, 'output.txt')
    const input = await fs.promises.readFile(inputPath, { encoding: 'utf-8' })
    const output = await fs.promises.readFile(outputPath, {
      encoding: 'utf-8'
    })
    return { input, output }
  }

  static async runManyWithSolutions (solutions: Solution[]): Promise<number> {
    for (const solution of solutions) {
      await solution.test()
      console.log('\n------------------------------\n')
    }
    console.log(Test.successMessage)
    return 0
  }

  static async runAllTests (programmingLanguage?: string): Promise<number> {
    const solutions = await Solution.getManyByProgrammingLanguages(
      programmingLanguage != null ? [programmingLanguage] : undefined
    )
    await Test.runManyWithSolutions(solutions)
    return 0
  }

  static async run (options: TestRunOptions): Promise<Test> {
    const { input, output } = await Test.getInputOutput(options.path)
    const start = performance.now()
    const stdout = await docker.run(input)
    const end = performance.now()
    const test = new Test({
      path: options.path,
      index: options.index,
      input,
      output,
      stdout,
      isSuccess: stdout === output,
      elapsedTimeMilliseconds: end - start
    })
    return test
  }
}
