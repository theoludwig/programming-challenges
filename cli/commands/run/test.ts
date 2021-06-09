import { Command, Option } from 'clipanion'
import * as typanion from 'typanion'

import chalk from 'chalk'

import { Solution } from '../../services/Solution'
import { gitAffected } from '../../services/GitAffected'

export class RunTestCommand extends Command {
  static paths = [['run', 'test']]

  static usage = {
    description:
      'Test if the solution is correct and display where it succeeds and fails.'
  }

  public programmingLanguage = Option.String('--language', {
    description: 'language',
    validator: typanion.isString()
  })

  public challenge = Option.String('--challenge', {
    description: 'challenge',
    validator: typanion.isString()
  })

  public solutionName = Option.String('--solution', {
    description: 'solution',
    validator: typanion.isString()
  })

  public affected = Option.Boolean('--affected', false, {
    description: 'affected'
  })

  async execute(): Promise<number> {
    try {
      if (this.affected) {
        await gitAffected.getAffectedSolutions()
        return 0
      }
      if (
        this.solutionName == null ||
        this.challenge == null ||
        this.programmingLanguage == null
      ) {
        throw new Error(
          'You must specify all the options (`--challenge`, `--solution`,  `--language`).'
        )
      }
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
