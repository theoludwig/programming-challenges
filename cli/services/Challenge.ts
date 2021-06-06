import path from 'path'
import fs from 'fs'

import validateProjectName from 'validate-npm-package-name'

import { isExistingPath } from '../utils/isExistingPath'
import { template } from './Template'

export interface ChallengeOptions {
  name: string
}

export interface GenerateChallengeOptions extends ChallengeOptions {
  githubUser: string
}

export class Challenge implements ChallengeOptions {
  public name: string
  public path: string

  constructor (options: ChallengeOptions) {
    const { name } = options
    this.name = name
    this.path = path.join(__dirname, '..', '..', 'challenges', name)
  }

  static async generate (options: GenerateChallengeOptions): Promise<Challenge> {
    const { name, githubUser } = options
    const challenge = new Challenge({ name })
    if (await isExistingPath(challenge.path)) {
      throw new Error(`The challenge already exists: ${name}.`)
    }
    const isValidName = validateProjectName(name).validForNewPackages
    if (!isValidName) {
      throw new Error('Invalid challenge name.')
    }
    await fs.promises.mkdir(challenge.path)
    await template.challenge({
      destination: challenge.path,
      githubUser,
      name
    })
    return challenge
  }
}
