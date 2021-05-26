import path from 'path'
import * as fsWithCallbacks from 'fs'
import chalk from 'chalk'
import execa from 'execa'

import {
  createTemporaryEmptyFolder,
  TEMPORARY_PATH
} from '../utils/createTemporaryEmptyFolder'
import { isExistingPath } from '../utils/isExistingPath'
import { Challenge } from './Challenge'
import { ProgrammingLanguage } from './ProgrammingLanguage'

const fs = fsWithCallbacks.promises

const TEMPORARY_INPUT_PATH = path.join(TEMPORARY_PATH, 'input.json')
const TEMPORARY_OUTPUT_PATH = path.join(TEMPORARY_PATH, 'output.json')

export interface GetSolutionOptions {
  programmingLanguageName: string
  challengeName: string
  name: string
}

export interface SolutionOptions {
  path: string
  name: string
  programmingLanguage: ProgrammingLanguage
  challenge: Challenge
}

export class Solution implements SolutionOptions {
  public programmingLanguage: ProgrammingLanguage
  public challenge: Challenge
  public name: string
  public path: string

  constructor(options: SolutionOptions) {
    const { programmingLanguage, challenge, name, path } = options
    this.programmingLanguage = programmingLanguage
    this.challenge = challenge
    this.name = name
    this.path = path
  }

  private async handleStandardError(error: string): Promise<void> {
    console.error(chalk.bgRedBright.black('Error occurred in your solution :'))
    console.error(error)
    process.exit(1)
  }

  public async test(): Promise<number> {
    const inputOutput = await this.challenge.getInputOutput()
    let totalSuccessfulTest = 0
    for (const { input, output } of inputOutput) {
      await createTemporaryEmptyFolder()
      const inputString = JSON.stringify(input)
      await fs.writeFile(TEMPORARY_INPUT_PATH, inputString, {
        encoding: 'utf8'
      })
      await fs.copyFile(
        path.join(
          this.path,
          `solution${this.programmingLanguage.fileExtension}`
        ),
        path.join(
          TEMPORARY_PATH,
          `solution${this.programmingLanguage.fileExtension}`
        )
      )
      await fs.copyFile(
        path.join(
          __dirname,
          '..',
          '..',
          'execute',
          `execute${this.programmingLanguage.fileExtension}`
        ),
        path.join(
          TEMPORARY_PATH,
          `execute${this.programmingLanguage.fileExtension}`
        )
      )
      process.chdir(TEMPORARY_PATH)
      try {
        const { stderr } = await execa(this.programmingLanguage.executable, [
          `execute${this.programmingLanguage.fileExtension}`
        ])
        if (stderr.length !== 0) {
          await this.handleStandardError(stderr)
        }
        const currentRawOutput = await fs.readFile(TEMPORARY_OUTPUT_PATH, {
          encoding: 'utf-8'
        })
        const isCorrect = JSON.stringify(output) === currentRawOutput
        if (isCorrect) {
          totalSuccessfulTest += 1
        }
      } catch (error) {
        await this.handleStandardError(error.stderr)
      }
    }
    return totalSuccessfulTest === inputOutput.length ? 0 : 1
  }

  static async get(options: Partial<GetSolutionOptions>): Promise<Solution> {
    const {
      name = '',
      challengeName = '',
      programmingLanguageName = ''
    } = options
    const challenge = new Challenge({
      name: challengeName
    })
    const programmingLanguage = ProgrammingLanguage.get(programmingLanguageName)
    const solutionPath = path.join(
      challenge.path,
      'solutions',
      programmingLanguage.name.toLowerCase(),
      name
    )
    if (!(await isExistingPath(solutionPath))) {
      throw new Error('The solution was not found')
    }
    return new Solution({
      name,
      challenge,
      programmingLanguage,
      path: solutionPath
    })
  }
}
