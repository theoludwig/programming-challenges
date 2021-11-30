import { Command, Option } from 'clipanion'
import * as typanion from 'typanion'
import chalk from 'chalk'

import { Solution } from '../../services/Solution'
import { GitAffected } from '../../services/GitAffected'
import { template } from '../../services/Template'
import { Test } from '../../services/Test'

export class RunTestCommand extends Command {
  static paths = [['run', 'test']]

  static usage = {
    description:
      'Test if the solution is correct and display where it succeeds and fails.'
  }

  public programmingLanguage = Option.String('--language', {
    description: 'The programming language used to solve the challenge.',
    validator: typanion.isString()
  })

  public challenge = Option.String('--challenge', {
    description: 'The challenge name where you want to test your solution.',
    validator: typanion.isString()
  })

  public solutionName = Option.String('--solution', {
    description: 'solution',
    validator: typanion.isString()
  })

  public affected = Option.Boolean('--affected', false, {
    description: 'Only run the tests for the affected files in `git`.'
  })

  public all = Option.Boolean('--all', false, {
    description: 'Run the tests for all the solutions.'
  })

  public isContinuousIntegration = Option.Boolean('--ci', false, {
    description: 'Run the tests for the Continuous Integration (CI).'
  })

  public base = Option.String('--base', {
    description: 'Base of the current branch (usually master)'
  })

  async execute (): Promise<number> {
    console.log()
    try {
      if (this.programmingLanguage != null) {
        await template.verifySupportedProgrammingLanguage(this.programmingLanguage)
      }
      if (this.all) {
        return await Test.runAllTests(this.programmingLanguage)
      }
      if (this.affected) {
        const gitAffected = new GitAffected({
          isContinuousIntegration: this.isContinuousIntegration,
          base: this.base
        })
        const solutions = await gitAffected.getAffectedSolutions()
        return await Test.runManyWithSolutions(solutions)
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
      console.log(Test.SUCCESS_MESSAGE)
      return 0
    } catch (error) {
      if (error instanceof Error) {
        console.error(`${chalk.bold.red('Error:')} ${error.message}`)
      }
      return 1
    }
  }
}
