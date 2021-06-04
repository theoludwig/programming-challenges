import { Command, Option } from 'clipanion'
import { Solution } from '../../services/Solution'

export class GenerateSolutionCommand extends Command {
  static paths = [['generate', 'solution']]

  static usage = {
    description: 'Create the basic files needed for a new solution.'
  }

  public challenge = Option.String('--challenge', {
    description: 'challenge'
  })

  public githubUser = Option.String('--github-user', {
    description: 'github-user'
  })

  public solutionName = Option.String('--solution', {
    description: 'solution'
  })

  public programmingLanguage = Option.String('--language', {
    description: 'language'
  })

  async execute(): Promise<number> {
    try {
      await Solution.generate({
        name: this.solutionName,
        githubUser: this.githubUser,
        challengeName: this.challenge,
        programmingLanguageName: this.programmingLanguage?.toLowerCase()
      })
      return 0
    } catch (error) {
      console.error(error.message)
      return 1
    }
  }
}
