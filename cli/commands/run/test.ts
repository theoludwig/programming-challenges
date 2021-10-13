import fs from 'node:fs'
import path from 'node:path'

import { Command, Option } from 'clipanion'
import * as typanion from 'typanion'
import chalk from 'chalk'

import { Solution } from '../../services/Solution'
import { GitAffected } from '../../services/GitAffected'
import { template } from '../../services/Template'

const successMessage = `${chalk.bold.green('Success:')} Tests passed! 🎉`

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

  async runTests (solutions: Solution[]): Promise<number> {
    for (const solution of solutions) {
      await solution.test()
      console.log('\n------------------------------\n')
    }
    console.log(successMessage)
    return 0
  }

  async execute (): Promise<number> {
    console.log()
    try {
      if (this.programmingLanguage != null) {
        await template.verifySupportedProgrammingLanguage(this.programmingLanguage)
      }
      if (this.all) {
        const challengesPath = path.join(
          __dirname,
          '..',
          '..',
          '..',
          'challenges'
        )
        const challenges = await fs.promises.readdir(challengesPath)
        const paths: string[] = []
        for (const challenge of challenges) {
          const solutionsPath = path.join(challengesPath, challenge, 'solutions')
          const languagesSolution = (await fs.promises.readdir(solutionsPath)).filter(
            (name) => {
              if (this.programmingLanguage != null) {
                return name === this.programmingLanguage
              }
              return name !== '.gitkeep'
            }
          )
          for (const language of languagesSolution) {
            const solutionPath = (await fs.promises.readdir(path.join(solutionsPath, language))).map((solutionName) => {
              return `challenges/${challenge}/solutions/${language}/${solutionName}`
            })
            paths.push(...solutionPath)
          }
        }
        const solutions = await Solution.getManyByPaths(paths)
        await this.runTests(solutions)
        return 0
      }
      if (this.affected) {
        const gitAffected = new GitAffected({
          isContinuousIntegration: this.isContinuousIntegration,
          base: this.base
        })
        const solutions = await gitAffected.getAffectedSolutions()
        return await this.runTests(solutions)
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
      console.log(successMessage)
      return 0
    } catch (error) {
      if (error instanceof Error) {
        console.error(`${chalk.bold.red('Error:')} ${error.message}`)
      }
      return 1
    }
  }
}
