import path from 'path'
import * as fsWithCallbacks from 'fs'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { replaceInFile } from 'replace-in-file'
import makeDir from 'make-dir'
import date from 'date-and-time'
import validateProjectName from 'validate-npm-package-name'
import copyDirPromise from './utils/copyDirPromise'
;(async () => {
  const fs = fsWithCallbacks.promises
  const challengesPath = path.resolve(__dirname, '..', 'challenges')
  const challengesAvailable = await fs.readdir(challengesPath)
  const languagesAvailable: {
    name: string
    extension: string
    launch: string
  }[] = require('./languages-wrapper/_languages.json')

  const QUESTIONS = [
    {
      name: 'challengeName',
      type: 'list',
      message: 'Select a challenge:',
      choices: challengesAvailable
    },
    {
      name: 'programmingLanguage',
      type: 'list',
      message: 'Select a programming language:',
      choices: languagesAvailable.map(language => ({ name: language.name, value: language }))
    },
    {
      name: 'solutionName',
      type: 'input',
      message: 'Solution name:'
    },
    {
      name: 'userGitHub',
      type: 'input',
      message: 'Your GitHub name:'
    }
  ]

  const answers = await inquirer.prompt(QUESTIONS)
  console.log()
  const { challengeName, solutionName, userGitHub } = answers as {
    [key: string]: string
  }
  const { programmingLanguage } = answers as { 
    programmingLanguage: {
      extension: string
      name: string
    }
  }

  const validSolutionName = validateProjectName(solutionName)
  if (!validSolutionName.validForNewPackages) {
    console.log(`
        Invalid solution name: ${chalk.red(solutionName)}
          ${validSolutionName.errors != undefined &&
            validSolutionName.errors[0]}
    `)
    process.exit(0)
  }

  const solutionPath = path.resolve(
    __dirname,
    '..',
    'challenges',
    challengeName,
    'solutions',
    solutionName
  )
  const templatePath = path.resolve(__dirname, 'templates', 'solutions')
  const templateSolutionPath = path.resolve(__dirname, 'languages-wrapper', 'templates')

  // Solution valid ?
  if (fsWithCallbacks.existsSync(solutionPath)) {
    console.log(`The solution already exists: ${chalk.red(solutionName)}`)
    process.exit(0)
  }

  const createdSolutionTemplatePath = await makeDir(solutionPath)
  await copyDirPromise(templatePath, createdSolutionTemplatePath)

  const languageSolutionTemplate = path.join(templateSolutionPath, `solution${programmingLanguage.extension}`)
  await fs.copyFile(languageSolutionTemplate, path.join(createdSolutionTemplatePath, `solution${programmingLanguage.extension}`))

  // Replace {{ solutionName }} in README.md
  const readmePath = path.join(createdSolutionTemplatePath, 'README.md')
  await replaceInFile({
    files: [readmePath],
    from: /{{ solutionName }}/g,
    to: `${solutionName} - ${challengeName}`
  })

  // Replace {{ solutionInfo }} in README.md
  const createdByString = `Created${(userGitHub !== '') ? ` by [@${userGitHub}](https://github.com/${userGitHub})` : ''} on ${date.format(new Date(), 'D MMMM Y', true)}.`
  await replaceInFile({
    files: [readmePath],
    from: /{{ solutionInfo }}/g,
    to: 'Programming language : ' + programmingLanguage.name + '\n\n' + createdByString
  })

  console.log(`
    ${chalk.green('Success:')} "${solutionName}" created.
    ${chalk.cyan(`Edit your solution${programmingLanguage.extension} file and try to solve "${challengeName}" challenge (see README.md).`)}

    Don't forget to test your solution attempt :
    ${chalk.green(`npm run test ${challengeName} ${solutionName}`)}
  `)
})()
