import { Command, Option } from 'clipanion'
import { Challenge } from '../../services/Challenge'

export class GenerateChallengeCommand extends Command {
  static paths = [['generate', 'challenge']]

  static usage = {
    description: 'Create the basic files needed for a new challenge.'
  }

  public challenge = Option.String('--challenge', {
    description: 'challenge'
  })

  public githubUser = Option.String('--github-user', {
    description: 'github-user'
  })

  async execute(): Promise<number> {
    try {
      await Challenge.create({
        name: this.challenge,
        githubUser: this.githubUser
      })
      return 0
    } catch (error) {
      console.error(error.message)
      return 1
    }
  }
}
