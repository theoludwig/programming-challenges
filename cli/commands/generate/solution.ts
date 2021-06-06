import { Command, Option } from 'clipanion'
import * as typanion from 'typanion'

import chalk from 'chalk'

import { Solution } from '../../services/Solution'

export class GenerateSolutionCommand extends Command {
  static paths = [['generate', 'solution']]

  static usage = {
    description: 'Create the basic files needed for a new solution.'
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

  public solutionName = Option.String('--solution', {
    description: 'solution',
    required: true,
    validator: typanion.isString()
  })

  public programmingLanguage = Option.String('--language', {
    description: 'language',
    required: true,
    validator: typanion.isString()
  })

  async execute (): Promise<number> {
    try {
      const solution = await Solution.generate({
        name: this.solutionName,
        githubUser: this.githubUser,
        challengeName: this.challenge,
        programmingLanguageName: this.programmingLanguage
      })
      console.log(
        `${chalk.bold.green('Success:')} created the new solution at ${
          solution.path
        }.`
      )
      return 0
    } catch (error) {
      console.error(`${chalk.bold.red('Error:')} ${error.message as string}`)
      return 1
    }
  }
}
