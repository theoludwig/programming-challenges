import simpleGit from 'simple-git'

import { Challenge } from './Challenge'
import { Solution } from './Solution'

const git = simpleGit()

const solutionsRegex = new RegExp(
  /challenges\/[\s\S]*\/solutions\/(c|cpp|dart|javascript|python|rust|typescript)\/[\s\S]*\/solution.(c|cpp|dart|js|py|rs|ts)/
)

class GitAffected {
  public async getAffectedSolutions (): Promise<Solution[]> {
    await git.add('.')
    const diff = await git.diff(['--name-only', '--staged'])
    const affectedSolutionsPaths = diff.split('\n').filter((currentDiff) => {
      return solutionsRegex.test(currentDiff)
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

export const gitAffected = new GitAffected()
