import path from 'node:path'
import fs from 'node:fs'

import { Command, Option } from 'clipanion'
import * as typanion from 'typanion'
import chalk from 'chalk'

import { isExistingPath } from '../../utils/isExistingPath.js'
import { template } from '../../services/Template.js'
import { Solution } from '../../services/Solution.js'
import { TemporaryFolder } from '../../services/TemporaryFolder.js'

export class RunSolutionCommand extends Command {
  static paths = [['run', 'solution']]

  static usage = {
    description: 'Run the solution with the given `input.txt` file.'
  }

  public programmingLanguage = Option.String('--language', {
    description: 'The programming language used to solve the challenge.',
    required: true,
    validator: typanion.isString()
  })

  public challenge = Option.String('--challenge', {
    description: 'The challenge name where you want to run your solution.',
    required: true,
    validator: typanion.isString()
  })

  public solutionName = Option.String('--solution', {
    description: 'The solution name to run.',
    required: true,
    validator: typanion.isString()
  })

  public inputPathUser = Option.String('--input-path', {
    description: 'The input file path to use.',
    required: true,
    validator: typanion.isString()
  })

  public output = Option.Boolean('--output', false, {
    description: 'Display the output of the solution.'
  })

  async execute(): Promise<number> {
    console.log()
    try {
      await TemporaryFolder.cleanAll()
      await template.verifySupportedProgrammingLanguage(
        this.programmingLanguage
      )
      const solution = await Solution.get({
        name: this.solutionName,
        challengeName: this.challenge,
        programmingLanguageName: this.programmingLanguage
      })
      const inputPath = path.resolve(process.cwd(), this.inputPathUser)
      if (!(await isExistingPath(inputPath))) {
        throw new Error(`The \`input-path\` doesn't exist: ${inputPath}.`)
      }
      const input = await fs.promises.readFile(inputPath, { encoding: 'utf-8' })
      await solution.run(input, this.output)
      await TemporaryFolder.cleanAll()
      return 0
    } catch (error) {
      if (error instanceof Error) {
        console.error(`${chalk.bold.red('Error:')} ${error.message}`)
      }
      await TemporaryFolder.cleanAll()
      return 1
    }
  }
}
