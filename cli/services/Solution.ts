import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'
import { performance } from 'node:perf_hooks'

import chalk from 'chalk'
import ora from 'ora'

import { isExistingPath } from '../utils/isExistingPath.js'
import { Challenge } from './Challenge.js'
import { copyDirectory } from '../utils/copyDirectory.js'
import { template } from './Template.js'
import { docker } from './Docker.js'
import { Test } from './Test.js'
import { SolutionTestsResult } from './SolutionTestsResult.js'
import { TemporaryFolder } from './TemporaryFolder.js'

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
  public temporaryFolder: TemporaryFolder

  constructor(options: SolutionOptions) {
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
    this.temporaryFolder = new TemporaryFolder()
  }

  private async setup(): Promise<void> {
    await this.temporaryFolder.create()
    await copyDirectory(this.path, this.temporaryFolder.path)
    await template.docker({
      programmingLanguage: this.programmingLanguageName,
      destination: this.temporaryFolder.path
    })
    process.chdir(this.temporaryFolder.path)
    try {
      await docker.build(this.temporaryFolder.id)
    } catch (error: any) {
      throw new Error(
        `solution: ${this.path}\n${error.message as string}\n`
      )
    }
  }

  public async test(): Promise<SolutionTestsResult> {
    await this.setup()
    return await Test.runAll(this)
  }

  public async run(input: string, output: boolean = false): Promise<void> {
    await this.setup()
    const loader = ora('Running...').start()
    try {
      const start = performance.now()
      const { stdout } = await docker.run(input, this.temporaryFolder.id)
      const end = performance.now()
      const elapsedTimeMilliseconds = end - start
      loader.succeed(chalk.bold.green('Success!'))
      SolutionTestsResult.printBenchmark(elapsedTimeMilliseconds)
      if (output) {
        console.log(`${chalk.bold('Output:')}`)
        console.log(stdout)
      }
    } catch (error: any) {
      loader.fail()
      throw new Error(
        `solution: ${this.path}\n${error.message as string}\n`
      )
    }
  }

  static async generate(options: GenerateSolutionOptions): Promise<Solution> {
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

  static async get(options: GetSolutionOptions): Promise<Solution> {
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

  static async getManyByChallenge(challenge: Challenge): Promise<Solution[]> {
    const solutionsPath = path.join(challenge.path, 'solutions')
    const languagesSolution = (await fs.promises.readdir(solutionsPath)).filter(
      (name) => {
        return name !== '.gitkeep'
      }
    )
    const paths: string[] = []
    for (const language of languagesSolution) {
      const solutionPath = (
        await fs.promises.readdir(path.join(solutionsPath, language))
      ).map((solutionName) => {
        return `challenges/${challenge.name}/solutions/${language}/${solutionName}`
      })
      paths.push(...solutionPath)
    }
    return await Solution.getManyByPaths(paths)
  }

  static async getManyByProgrammingLanguages(
    programmingLanguages?: string[]
  ): Promise<Solution[]> {
    const languages =
      programmingLanguages ?? (await template.getProgrammingLanguages())
    const challengesPath = fileURLToPath(
      new URL('../../challenges', import.meta.url)
    )
    const challenges = await fs.promises.readdir(challengesPath)
    const paths: string[] = []
    for (const challenge of challenges) {
      const solutionsPath = path.join(challengesPath, challenge, 'solutions')
      const languagesSolution = (
        await fs.promises.readdir(solutionsPath)
      ).filter((name) => {
        return name !== '.gitkeep' && languages.includes(name)
      })
      for (const language of languagesSolution) {
        const solutionPath = (
          await fs.promises.readdir(path.join(solutionsPath, language))
        ).map((solutionName) => {
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
  static async getManyByPaths(paths: string[]): Promise<Solution[]> {
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
