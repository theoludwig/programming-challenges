import simpleGit from 'simple-git'

import { Challenge } from './Challenge'
import { Solution } from './Solution'

const git = simpleGit()

const solutionsRegex = new RegExp(
  /challenges\/[\s\S]*\/solutions\/(c|cpp|dart|java|javascript|python|rust|typescript)\/[\s\S]*\/*.(c|cpp|dart|java|js|py|rs|ts)/
)

class GitAffected {
  public async getAffectedSolutions (): Promise<Solution[]> {
    const diff = await git.diff(['--name-only'])
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
