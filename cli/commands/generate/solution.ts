import { Command, Option } from 'clipanion'
import * as typanion from 'typanion'
import chalk from 'chalk'

import { Solution } from '../../services/Solution.js'

export class GenerateSolutionCommand extends Command {
  public static override paths = [['generate', 'solution']]

  public static override usage = {
    description: 'Create the basic files needed for a new solution.'
  }

  public challenge = Option.String('--challenge', {
    description: 'The challenge name you want to generate a solution for.',
    required: true,
    validator: typanion.isString()
  })

  public githubUser = Option.String('--github-user', {
    description: 'Your GitHub user.',
    required: true,
    validator: typanion.isString()
  })

  public solutionName = Option.String('--solution', {
    description: 'The new solution name to generate.',
    required: true,
    validator: typanion.isString()
  })

  public programmingLanguage = Option.String('--language', {
    description: 'The programming language to use to solve the challenge.',
    required: true,
    validator: typanion.isString()
  })

  public async execute(): Promise<number> {
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
      if (error instanceof Error) {
        console.error(`${chalk.bold.red('Error:')} ${error.message}`)
      }
      return 1
    }
  }
}
