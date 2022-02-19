import path from 'node:path'
import fs from 'node:fs'

import {
  createTemporaryEmptyFolder,
  TEMPORARY_PATH
} from '../utils/createTemporaryEmptyFolder.js'
import { isExistingPath } from '../utils/isExistingPath.js'
import { Challenge } from './Challenge.js'
import { copyDirectory } from '../utils/copyDirectory.js'
import { template } from './Template.js'
import { docker } from './Docker.js'
import { Test } from './Test.js'

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
      throw new Error(`The challenge doesn't exist yet: ${challenge.name}.`)
    }
    const solution = new Solution({
      name,
      challenge,
      programmingLanguageName
    })
    if (await isExistingPath(solution.path)) {
      throw new Error(`The solution already exists: ${name}.`)
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

  static async getManyByChallenge (challenge: Challenge): Promise<Solution[]> {
    const solutionsPath = path.join(challenge.path, 'solutions')
    const languagesSolution = (await fs.promises.readdir(solutionsPath)).filter(
      (name) => {
        return name !== '.gitkeep'
      }
    )
    const paths: string[] = []
    for (const language of languagesSolution) {
      const solutionPath = (await fs.promises.readdir(path.join(solutionsPath, language))).map((solutionName) => {
        return `challenges/${challenge.name}/solutions/${language}/${solutionName}`
      })
      paths.push(...solutionPath)
    }
    return await Solution.getManyByPaths(paths)
  }

  static async getManyByProgrammingLanguages (programmingLanguages?: string[]): Promise<Solution[]> {
    const languages = programmingLanguages ?? await template.getProgrammingLanguages()
    const challengesPath = path.join(
      __dirname,
      '..',
      '..',
      'challenges'
    )
    const challenges = await fs.promises.readdir(challengesPath)
    const paths: string[] = []
    for (const challenge of challenges) {
      const solutionsPath = path.join(challengesPath, challenge, 'solutions')
      const languagesSolution = (await fs.promises.readdir(solutionsPath)).filter(
        (name) => {
          return name !== '.gitkeep' && languages.includes(name)
        }
      )
      for (const language of languagesSolution) {
        const solutionPath = (await fs.promises.readdir(path.join(solutionsPath, language))).map((solutionName) => {
          return `challenges/${challenge}/solutions/${language}/${solutionName}`
        })
        paths.push(...solutionPath)
      }
    }
    return await Solution.getManyByPaths(paths)
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
