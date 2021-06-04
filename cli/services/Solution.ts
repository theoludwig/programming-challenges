import path from 'path'
import * as fsWithCallbacks from 'fs'

import makeDirectory from 'make-dir'
import chalk from 'chalk'
import execa from 'execa'
import { replaceInFile } from 'replace-in-file'
import date from 'date-and-time'

import {
  createTemporaryEmptyFolder,
  TEMPORARY_PATH
} from '../utils/createTemporaryEmptyFolder'
import { isExistingPath } from '../utils/isExistingPath'
import { Challenge, TEMPLATES_PATH } from './Challenge'
import { ProgrammingLanguage } from './ProgrammingLanguage'
import { copyDirectory } from '../utils/copyDirectory'

const fs = fsWithCallbacks.promises

const TEMPORARY_INPUT_PATH = path.join(TEMPORARY_PATH, 'input.json')
const TEMPORARY_OUTPUT_PATH = path.join(TEMPORARY_PATH, 'output.json')
const TEMPLATE_SOLUTION_PATH = path.join(TEMPLATES_PATH, 'solution')

export interface GetSolutionOptions {
  programmingLanguageName: string
  challengeName: string
  name: string
}

export interface GenerateSolutionOptions extends GetSolutionOptions {
  githubUser: string
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

  static async generate(
    options: Partial<GenerateSolutionOptions>
  ): Promise<void> {
    const {
      name,
      challengeName = '',
      programmingLanguageName = '',
      githubUser
    } = options
    if (name == null) {
      throw new Error('Please specify the solution name you want to create.')
    }
    const challenge = new Challenge({ name: challengeName })
    if (!(await isExistingPath(challenge.path))) {
      throw new Error(`The challenge doesn't exist yet: ${name}.`)
    }
    const programmingLanguage = ProgrammingLanguage.get(programmingLanguageName)
    const solutionPath = path.join(
      challenge.path,
      'solutions',
      programmingLanguage.name.toLowerCase(),
      name
    )
    if (await isExistingPath(solutionPath)) {
      throw new Error('The solution already exists.')
    }
    await makeDirectory(solutionPath)
    await copyDirectory(TEMPLATE_SOLUTION_PATH, solutionPath)
    const readmePath = path.join(solutionPath, 'README.md')
    const dateString = date.format(new Date(), 'D MMMM Y', true)

    const description = `Created${
      githubUser != null
        ? ` by [@${githubUser}](https://github.com/${githubUser})`
        : ''
    } on ${dateString as string}.`
    await replaceInFile({
      files: [readmePath],
      from: /{{ name }}/g,
      to: `${challengeName}/${programmingLanguageName}/${name}`
    })
    await replaceInFile({
      files: [readmePath],
      from: /{{ description }}/g,
      to: description
    })
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
      try {
        const executePath = path.join(
          TEMPORARY_PATH,
          `execute${this.programmingLanguage.fileExtension}`
        )
        const { stderr } = await execa(this.programmingLanguage.executable, [
          executePath
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
