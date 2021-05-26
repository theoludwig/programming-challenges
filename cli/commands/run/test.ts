import { Command, Option } from 'clipanion'

import { Solution } from '../../services/Solution'

export class RunTestCommand extends Command {
  static paths = [['run', 'test']]

  static usage = {
    description:
      'Test if the solution is correct and display where it succeeds and fails.'
  }

  public programmingLanguage = Option.String('--language', {
    description: 'language'
  })

  public challenge = Option.String('--challenge', {
    description: 'challenge'
  })

  public solutionName = Option.String('--solution', {
    description: 'solution'
  })

  async execute(): Promise<number> {
    try {
      const solution = await Solution.get({
        name: this.solutionName,
        challengeName: this.challenge,
        programmingLanguageName: this.programmingLanguage
      })
      return await solution.test()
    } catch (error) {
      console.error(error.message)
      return 1
    }
  }
}
