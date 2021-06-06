import { Command, Option } from 'clipanion'
import * as typanion from 'typanion'

import chalk from 'chalk'

import { Solution } from '../../services/Solution'

export class RunTestCommand extends Command {
  static paths = [['run', 'test']]

  static usage = {
    description:
      'Test if the solution is correct and display where it succeeds and fails.'
  }

  public programmingLanguage = Option.String('--language', {
    description: 'language',
    required: true,
    validator: typanion.isString()
  })

  public challenge = Option.String('--challenge', {
    description: 'challenge',
    required: true,
    validator: typanion.isString()
  })

  public solutionName = Option.String('--solution', {
    description: 'solution',
    required: true,
    validator: typanion.isString()
  })

  async execute (): Promise<number> {
    try {
      const solution = await Solution.get({
        name: this.solutionName,
        challengeName: this.challenge,
        programmingLanguageName: this.programmingLanguage
      })
      await solution.test()
      console.log(`${chalk.bold.green('Success:')} Tests passed! 🎉`)
      return 0
    } catch (error) {
      console.error(`${chalk.bold.red('Error:')} ${error.message as string}`)
      return 1
    }
  }
}
