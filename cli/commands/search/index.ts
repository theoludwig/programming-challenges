import path from 'node:path'
import fs from 'node:fs'

import { Command, Option } from 'clipanion'
import * as typanion from 'typanion'
import chalk from 'chalk'

import { template } from '../../services/Template.js'
import { Challenge } from '../../services/Challenge.js'

export class SearchCommand extends Command {
  public static override paths = [['search']]

  public static override usage = {
    description: 'Search challenges in the programming language specified.'
  }

  public solved = Option.Boolean('--solved', false, {
    description:
      'Challenges which have already been solved (at least with one solution).'
  })

  public programmingLanguage = Option.String('--language', {
    description: 'The programming language used to solve the challenge.',
    required: true,
    validator: typanion.isString()
  })

  public async execute(): Promise<number> {
    try {
      await template.verifySupportedProgrammingLanguage(
        this.programmingLanguage
      )
      const challenges = await Challenge.getChallenges()
      const challengesResult: Challenge[] = []
      for (const challenge of challenges) {
        const solutionsPath = path.join(challenge.path, 'solutions')
        const solutions = await fs.promises.readdir(solutionsPath)
        if (
          (!this.solved && !solutions.includes(this.programmingLanguage)) ||
          (this.solved && solutions.includes(this.programmingLanguage))
        ) {
          challengesResult.push(challenge)
        }
      }
      const message = this.solved
        ? 'Challenges already solved'
        : 'Challenges not yet solved'
      console.log(`${message} in ${chalk.bold(this.programmingLanguage)}:`)
      for (const challenge of challengesResult) {
        console.log(`  - ${challenge.name}`)
      }
      return 0
    } catch (error) {
      if (error instanceof Error) {
        console.error(`${chalk.bold.red('Error:')} ${error.message}`)
      }
      return 1
    }
  }
}
