import path from 'node:path'

import {
  createTemporaryEmptyFolder,
  TEMPORARY_PATH
} from '../utils/createTemporaryEmptyFolder'
import { isExistingPath } from '../utils/isExistingPath'
import { Challenge } from './Challenge'
import { copyDirectory } from '../utils/copyDirectory'
import { template } from './Template'
import { docker } from './Docker'
import { Test } from './Test'

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
    await docker.build()
    await Test.runAll(this)
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

  /**
   * Get Solutions by relative paths.
   * @param paths relative to `challenges` (e.g: `challenges/hello-world/solutions/c/function`)
   * @returns
   */
  static async getManyByPaths (paths: string[]): Promise<Solution[]> {
    const solutions: string[] = []
    for (const path of paths) {
      if (await isExistingPath(path)) {
        solutions.push(path)
      }
    }
    return solutions.map((solution) => {
      const [, challengeName, , programmingLanguageName, solutionName] =
        solution.replaceAll('\\', '/').split('/')
      return new Solution({
        challenge: new Challenge({
          name: challengeName
        }),
        name: solutionName,
        programmingLanguageName
      })
    })
  }
}
