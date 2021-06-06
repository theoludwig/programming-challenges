import { Command, Option } from 'clipanion'
import * as typanion from 'typanion'

import chalk from 'chalk'

import { Challenge } from '../../services/Challenge'

export class GenerateChallengeCommand extends Command {
  static paths = [['generate', 'challenge']]

  static usage = {
    description: 'Create the basic files needed for a new challenge.'
  }

  public challenge = Option.String('--challenge', {
    description: 'challenge',
    required: true,
    validator: typanion.isString()
  })

  public githubUser = Option.String('--github-user', {
    description: 'github-user',
    required: true,
    validator: typanion.isString()
  })

  async execute (): Promise<number> {
    try {
      const challenge = await Challenge.generate({
        name: this.challenge,
        githubUser: this.githubUser
      })
      console.log(
        `${chalk.bold.green('Success:')} created the new challenge at ${
          challenge.path
        }.`
      )
      return 0
    } catch (error) {
      console.error(`${chalk.bold.red('Error:')} ${error.message as string}`)
      return 1
    }
  }
}
