import simpleGit from 'simple-git'

const git = simpleGit()

const solutionsRegex = new RegExp(
  /challenges\/[\s\S]*\/solutions\/(c|cpp|dart|java|javascript|python|rust|typescript)\/[\s\S]*\/solution.(c|cpp|dart|java|js|py|rs|ts)/
)

class GitAffected {
  public async getAffectedSolutions(): Promise<any> {
    const diff = await git.diff(['--name-only'])
    const affectedSolutionsPath = diff.split('\n').filter((currentDiff) => {
      return solutionsRegex.test(currentDiff)
    })
    console.log(affectedSolutionsPath)
  }
}

export const gitAffected = new GitAffected()
