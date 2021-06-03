import path from 'path'
import * as fsWithCallbacks from 'fs'

import makeDirectory from 'make-dir'
import validateProjectName from 'validate-npm-package-name'
import { replaceInFile } from 'replace-in-file'
import date from 'date-and-time'

import { isExistingPath } from '../utils/isExistingPath'
import { copyDirectory } from '../utils/copyDirectory'

const fs = fsWithCallbacks.promises

const TEMPLATES_PATH = path.join(__dirname, '..', '..', 'templates')
const TEMPLATE_CHALLENGE_PATH = path.join(TEMPLATES_PATH, 'challenge')

export interface InputOutput {
  input: any
  output: any
}

export interface ChallengeOptions {
  name: string
}

export interface GenerateChallengeOptions extends ChallengeOptions {
  githubUser: string
}

export class Challenge implements ChallengeOptions {
  public name: string
  public path: string

  constructor(options: ChallengeOptions) {
    const { name } = options
    this.name = name
    this.path = path.join(__dirname, '..', '..', 'challenges', name)
  }

  static async generate(
    options: Partial<GenerateChallengeOptions>
  ): Promise<void> {
    const { name, githubUser } = options
    if (name == null) {
      throw new Error('Please specify the challenge name you want to create.')
    }
    const challenge = new Challenge({ name })
    if (await isExistingPath(challenge.path)) {
      throw new Error(`The challenge already exists: ${name}`)
    }
    const isValidName = validateProjectName(name).validForNewPackages as boolean
    if (!isValidName) {
      throw new Error('Invalid challenge name')
    }
    await makeDirectory(challenge.path)
    await copyDirectory(TEMPLATE_CHALLENGE_PATH, challenge.path)
    const readmePath = path.join(challenge.path, 'README.md')
    const dateString = date.format(new Date(), 'D MMMM Y', true)

    const description = `Created${
      githubUser != null
        ? ` by [@${githubUser}](https://github.com/${githubUser})`
        : ''
    } on ${dateString as string}.`

    await replaceInFile({
      files: [readmePath],
      from: /{{ name }}/g,
      to: name
    })
    await replaceInFile({
      files: [readmePath],
      from: /{{ description }}/g,
      to: description
    })
  }

  public async getInputOutput(): Promise<InputOutput[]> {
    const inputOutputPath = path.join(this.path, 'input-output.json')
    if (!(await isExistingPath(inputOutputPath))) {
      throw new Error('Invalid "input-output.json"')
    }
    const rawInputOutput = await fs.readFile(inputOutputPath, {
      encoding: 'utf8'
    })
    const inputOutput: InputOutput[] = JSON.parse(rawInputOutput)
    return inputOutput
  }
}
