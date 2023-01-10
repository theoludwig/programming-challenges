import { execaCommand } from 'execa'

import { Challenge } from './Challenge.js'
import { Solution } from './Solution.js'
import { parseCommandOutput } from '../utils/parseCommandOutput.js'

const solutionsRegex =
  /challenges\/[\S\s]*\/solutions\/(c|cpp|cs|dart|java|javascript|python|rust|typescript)\/[\S\s]*\/(.*).(c|cpp|cs|dart|java|js|py|rs|ts)/

const dockerRegex =
  /templates\/docker\/(c|cpp|cs|dart|java|javascript|python|rust|typescript)\/(.*)/

const inputOutputRegex =
  /challenges\/[\S\s]*\/test\/(.*)\/(input.txt|output.txt)/

export interface GitAffectedOptions {
  base?: string
}

export class GitAffected implements GitAffectedOptions {
  public base?: string

  constructor(options: GitAffectedOptions = {}) {
    this.base = options.base
  }

  public async getFilesUsingBaseAndHead(
    base: string,
    head: string
  ): Promise<string[]> {
    try {
      const { stdout } = await execaCommand(
        `git diff --name-only --relative ${base} ${head}`
      )
      return parseCommandOutput(stdout)
    } catch {
      return []
    }
  }

  public async getUncommittedFiles(): Promise<string[]> {
    return await this.getFilesUsingBaseAndHead('HEAD', '.')
  }

  public async getLatestPushedCommit(): Promise<string> {
    const latestCommit = this.base != null ? '~1' : ''
    const { stdout } = await execaCommand(
      `git rev-parse origin/master${latestCommit}`
    )
    return stdout
  }

  public async getUnpushedFiles(): Promise<string[]> {
    return await this.getFilesUsingBaseAndHead(
      await this.getLatestPushedCommit(),
      '.'
    )
  }

  public async getAffectedSolutionsFromFiles(
    files: string[]
  ): Promise<Solution[]> {
    const affectedSolutionsPaths = files.filter((filePath) => {
      return solutionsRegex.test(filePath)
    })
    const affectedDockerPaths = files.filter((filePath) => {
      return dockerRegex.test(filePath)
    })
    const affectedLanguages = affectedDockerPaths.map((filePath) => {
      const [, , programmingLanguageName] = filePath
        .replaceAll('\\', '/')
        .split('/')
      if (programmingLanguageName == null) {
        throw new Error('programmingLanguageName is null')
      }
      return programmingLanguageName
    })
    const affectedInputOutput = files.filter((filePath) => {
      return inputOutputRegex.test(filePath)
    })
    const affectedChallengesFromInputOutput = affectedInputOutput.map(
      (filePath) => {
        const [, challengeName] = filePath.replaceAll('\\', '/').split('/')
        if (challengeName == null) {
          throw new Error('challengeName is null')
        }
        return new Challenge({ name: challengeName })
      }
    )
    const solutionsChallenges = await Solution.getManyByPaths(
      affectedSolutionsPaths
    )
    const solutionsDocker = await Solution.getManyByProgrammingLanguages(
      affectedLanguages
    )
    const solutions: Solution[] = [...solutionsDocker, ...solutionsChallenges]
    for (const challenge of affectedChallengesFromInputOutput) {
      const solutionsByChallenge = await Solution.getManyByChallenge(challenge)
      solutions.push(...solutionsByChallenge)
    }
    const solutionsUnique: Solution[] = []
    for (const solution of solutions) {
      const isAlreadyIncluded = solutionsUnique.some((solutionUnique) => {
        return solutionUnique.path === solution.path
      })
      if (!isAlreadyIncluded) {
        solutionsUnique.push(solution)
      }
    }
    return solutionsUnique
  }

  public async getAffectedSolutionsFromGit(): Promise<Solution[]> {
    let files = [
      ...(await this.getUnpushedFiles()),
      ...(await this.getUncommittedFiles())
    ]
    if (this.base != null) {
      files.push(...(await this.getFilesUsingBaseAndHead(this.base, '.')))
    }
    files = Array.from(new Set(files))
    return await this.getAffectedSolutionsFromFiles(files)
  }
}
