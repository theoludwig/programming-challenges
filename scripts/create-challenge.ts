import path from 'path'
import * as fsWithCallbacks from 'fs'
import chalk from 'chalk'
import makeDir from 'make-dir'
import inquirer from 'inquirer'
import { replaceInFile } from 'replace-in-file'
import validateProjectName from 'validate-npm-package-name'
import copyDirPromise from './utils/copyDirPromise'
import date from 'date-and-time'
;(async () => {
  const fs = fsWithCallbacks.promises
  const QUESTIONS = [
    {
      name: 'challengeName',
      type: 'input',
      message: 'Challenge name:'
    },
    {
      name: 'userGitHub',
      type: 'input',
      message: 'Your GitHub name:'
    }
  ]
  const answers = await inquirer.prompt(QUESTIONS)
  const { challengeName, userGitHub } = answers as {
    [key: string]: string
  }
  console.log()

  if (!challengeName || challengeName === '') {
    console.log(chalk.cyan('Please specify the challenge name you want to create.'))
    process.exit(0)
  }

  const validChallengeName = validateProjectName(challengeName)
  if (!validChallengeName.validForNewPackages) {
    console.log(`
        Invalid challenge name: ${chalk.red(challengeName)}
          ${validChallengeName.errors != undefined &&
            validChallengeName.errors[0]}
    `)
    process.exit(0)
  }

  const challengePath = path.resolve(
    __dirname,
    '..',
    'challenges',
    challengeName
  )
  const templatePath = path.resolve(__dirname, 'templates', 'challenge')

  // Challenge valid ?
  if (fsWithCallbacks.existsSync(challengePath)) {
    console.log(`The challenge already exists: ${chalk.red(challengeName)}`)
    process.exit(0)
  }

  const createdChallengeTemplatePath = await makeDir(challengePath)
  const solutionsFolderPath = path.join(createdChallengeTemplatePath, 'solutions')
  await copyDirPromise(templatePath, createdChallengeTemplatePath)
  await makeDir(solutionsFolderPath)
  await fs.writeFile(path.join(solutionsFolderPath, '.gitkeep'), '')

  // Replace {{ challengeName }} in README.md
  const readmePath = path.join(createdChallengeTemplatePath, 'README.md')
  await replaceInFile({
    files: [readmePath],
    from: /{{ challengeName }}/g,
    to: challengeName
  })

  // Replace {{ challengeInfo }} in README.md
  await replaceInFile({
    files: [readmePath],
    from: /{{ challengeInfo }}/g,
    to: `Created${(userGitHub !== '') ? ` by @${userGitHub}` : ''} at ${date.format(new Date(), 'D MMMM Y', true)}.`
  })

  console.log(`
    ${chalk.green('Success:')} "${challengeName}" challenge created.
    ${chalk.cyan('You can now edit README.md and input-output.json files.')}
  `)
})()
