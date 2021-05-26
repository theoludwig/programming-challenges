import path from 'path'
import * as fsWithCallbacks from 'fs'

import { isExistingPath } from '../utils/isExistingPath'

const fs = fsWithCallbacks.promises

export interface InputOutput {
  input: any
  output: any
}

export interface ChallengeOptions {
  name: string
}

export class Challenge implements ChallengeOptions {
  public name: string
  public path: string

  constructor(options: ChallengeOptions) {
    const { name } = options
    this.name = name
    this.path = path.join(__dirname, '..', '..', 'challenges', name)
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
