import path from 'path'
import fs from 'fs'

import execa from 'execa'
import chalk from 'chalk'
import ora from 'ora'
import { table } from 'table'

import {
  createTemporaryEmptyFolder,
  TEMPORARY_PATH
} from '../utils/createTemporaryEmptyFolder'
import { isExistingPath } from '../utils/isExistingPath'
import { Challenge } from './Challenge'
import { copyDirectory } from '../utils/copyDirectory'
import { template } from './Template'

export interface GetSolutionOptions {
  programmingLanguageName: string
  challengeName: string
  name: string
}

export interface GenerateSolutionOptions extends GetSolutionOptions {
  githubUser: string
}

export interface SolutionOptions {
  programmingLanguageName: string
  challenge: Challenge
  name: string
}

export class Solution implements SolutionOptions {
  public programmingLanguageName: string
  public challenge: Challenge
  public name: string
  public path: string

  constructor (options: SolutionOptions) {
    const { programmingLanguageName, challenge, name } = options
    this.programmingLanguageName = programmingLanguageName
    this.challenge = challenge
    this.name = name
    this.path = path.join(
      challenge.path,
      'solutions',
      programmingLanguageName,
      name
    )
  }

  private async prepareTemporaryFolder (): Promise<void> {
    await createTemporaryEmptyFolder()
    await copyDirectory(this.path, TEMPORARY_PATH)
    await template.docker({
      programmingLanguage: this.programmingLanguageName,
      destination: TEMPORARY_PATH
    })
    process.chdir(TEMPORARY_PATH)
  }

  public async test (): Promise<void> {
    await this.prepareTemporaryFolder()
    const testPath = path.join(this.challenge.path, 'test')
    const tests = await fs.promises.readdir(testPath)
    const containerTag = 'programming_challenges'
    await execa.command(`docker build --tag=${containerTag} ./`)
    const result: boolean[] = []
    const tableResult = [
      [
        chalk.cyan('N°'),
        chalk.cyan('Input'),
        chalk.cyan('Expected'),
        chalk.cyan('Received')
      ]
    ]
    for (let index = 0; index < tests.length; index++) {
      const test = tests[index]
      const loader = ora(`Test n°${index + 1}`).start()
      const inputPath = path.join(testPath, test, 'input.txt')
      const outputPath = path.join(testPath, test, 'output.txt')
      const input = await fs.promises.readFile(inputPath, { encoding: 'utf-8' })
      const output = await fs.promises.readFile(outputPath, {
        encoding: 'utf-8'
      })
      const { stdout } = await execa.command(
        `docker run --interactive --rm ${containerTag}`,
        {
          input
        }
      )
      const isSuccessTest = stdout === output
      result.push(isSuccessTest)
      if (isSuccessTest) {
        loader.succeed()
      } else {
        loader.fail()
        tableResult.push([(index + 1).toString(), input, output, stdout])
      }
    }

    const totalCorrectTest = result.reduce((total, isSuccess) => {
      if (!isSuccess) {
        return total
      }
      return total + 1
    }, 0)
    const isSuccess = totalCorrectTest === tests.length
    if (!isSuccess) {
      console.log()
      console.log(table(tableResult))
    } else {
      console.log()
    }
    const testsMessage = isSuccess
      ? chalk.green(`${totalCorrectTest} passed`)
      : chalk.red(`${tests.length - totalCorrectTest} failed`)
    console.log(`Name  : ${this.challenge.name}/${this.programmingLanguageName}/${this.name}
Tests : ${testsMessage}, ${tests.length} total
`)
    if (!isSuccess) {
      throw new Error('Tests failed, try again!')
    }
  }

  static async generate (options: GenerateSolutionOptions): Promise<Solution> {
    const { name, challengeName, programmingLanguageName, githubUser } = options
    const challenge = new Challenge({ name: challengeName })
    if (!(await isExistingPath(challenge.path))) {
      throw new Error(`The challenge doesn't exist yet: ${name}.`)
    }
    const solution = new Solution({
      name,
      challenge,
      programmingLanguageName
    })
    if (await isExistingPath(solution.path)) {
      throw new Error('The solution already exists.')
    }
    await fs.promises.mkdir(solution.path, { recursive: true })
    await template.solution({
      challengeName: challenge.name,
      destination: solution.path,
      githubUser,
      programmingLanguageName: solution.programmingLanguageName,
      name: solution.name
    })
    return solution
  }

  static async get (options: GetSolutionOptions): Promise<Solution> {
    const { name, challengeName, programmingLanguageName } = options
    const challenge = new Challenge({
      name: challengeName
    })
    const solution = new Solution({
      name,
      challenge,
      programmingLanguageName
    })
    if (!(await isExistingPath(solution.path))) {
      throw new Error('The solution was not found.')
    }
    return solution
  }
}
