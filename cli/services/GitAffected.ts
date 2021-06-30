import execa from 'execa'

import { Challenge } from './Challenge'
import { Solution } from './Solution'

const solutionsRegex = new RegExp(
  /challenges\/[\s\S]*\/solutions\/(c|cpp|cs|dart|java|javascript|python|rust|typescript)\/[\s\S]*\/(solution|Solution).(c|cpp|cs|dart|java|js|py|rs|ts)/
)

export interface GitAffectedOptions {
  isContinuousIntegration: boolean
  base?: string
}

export class GitAffected implements GitAffectedOptions {
  public isContinuousIntegration: boolean
  public base?: string

  constructor (options: GitAffectedOptions) {
    this.isContinuousIntegration = options.isContinuousIntegration
    this.base = options.base
  }

  public parseGitOutput (output: string): string[] {
    return output
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
  }

  public async getFilesUsingBaseAndHead (
    base: string,
    head: string
  ): Promise<string[]> {
    try {
      const { stdout } = await execa.command(
        `git diff --name-only --relative ${base} ${head}`
      )
      return this.parseGitOutput(stdout)
    } catch {
      return []
    }
  }

  public async getUncommittedFiles (): Promise<string[]> {
    return await this.getFilesUsingBaseAndHead('HEAD', '.')
  }

  public async getLatestPushedCommit (): Promise<string> {
    const latestCommit = this.isContinuousIntegration ? '~1' : ''
    const { stdout } = await execa.command(`git rev-parse origin/master${latestCommit}`)
    return stdout
  }

  public async getUnpushedFiles (): Promise<string[]> {
    return await this.getFilesUsingBaseAndHead(
      await this.getLatestPushedCommit(),
      '.'
    )
  }

  public async getAffectedSolutions (): Promise<Solution[]> {
    let files = [
      ...(await this.getUnpushedFiles()),
      ...(await this.getUncommittedFiles())
    ]
    if (this.base != null) {
      files.push(...(await this.getFilesUsingBaseAndHead(this.base, '.')))
    }
    files = Array.from(new Set(files))
    const affectedSolutionsPaths = files.filter((filePath) => {
      return solutionsRegex.test(filePath)
    })
    return affectedSolutionsPaths.map((solution) => {
      const [, challengeName, , programmingLanguageName, solutionName] =
        solution.split('/')
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
