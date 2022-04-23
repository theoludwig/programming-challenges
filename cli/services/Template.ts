import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'

import replaceInFileDefault from 'replace-in-file'
import date from 'date-and-time'

import { copyDirectory } from '../utils/copyDirectory.js'

const { replaceInFile } = replaceInFileDefault

const TEMPLATE_PATH = fileURLToPath(new URL('../../templates', import.meta.url))
const TEMPLATE_DOCKER_PATH = path.join(TEMPLATE_PATH, 'docker')
const TEMPLATE_CHALLENGE_PATH = path.join(TEMPLATE_PATH, 'challenge')
const TEMPLATE_SOLUTION_PATH = path.join(TEMPLATE_PATH, 'solution')
const TEMPLATE_SOLUTION_BASE_PATH = path.join(TEMPLATE_SOLUTION_PATH, 'base')

export interface TemplateDockerOptions {
  programmingLanguage: string
  destination: string
}

export interface TemplateChallengeOptions {
  name: string
  githubUser?: string
  destination: string
}

export interface TemplateSolutionOptions {
  challengeName: string
  programmingLanguageName: string
  name: string
  githubUser?: string
  destination: string
}

export interface ReplaceInDestinationOptions {
  destination: string
  name: string
  description: string
}

class Template {
  private getDescription(githubUser?: string): string {
    const dateString = date.format(new Date(), 'D MMMM Y', true)
    let description = 'Created'
    if (githubUser != null) {
      description += ` by [@${githubUser}](https://github.com/${githubUser})`
    }
    description += ` on ${dateString}.`
    return description
  }

  private async replaceInDestination(
    options: ReplaceInDestinationOptions
  ): Promise<void> {
    const { name, description, destination } = options
    const readmePath = path.join(destination, 'README.md')
    await replaceInFile({
      files: [readmePath],
      from: /{{ name }}/g,
      to: name
    })
    await replaceInFile({
      files: [readmePath],
      from: /{{ description }}/g,
      to: description
    })
  }

  public async docker(options: TemplateDockerOptions): Promise<void> {
    const { programmingLanguage, destination } = options
    const sourcePath = path.join(TEMPLATE_DOCKER_PATH, programmingLanguage)
    await copyDirectory(sourcePath, destination)
  }

  public async solution(options: TemplateSolutionOptions): Promise<void> {
    const {
      destination,
      githubUser,
      name,
      challengeName,
      programmingLanguageName
    } = options
    const templateLanguagePath = path.join(
      TEMPLATE_SOLUTION_PATH,
      programmingLanguageName
    )
    await this.verifySupportedProgrammingLanguage(programmingLanguageName)
    await fs.promises.mkdir(destination, { recursive: true })
    await copyDirectory(templateLanguagePath, destination)
    await copyDirectory(TEMPLATE_SOLUTION_BASE_PATH, destination)
    await this.replaceInDestination({
      name: `${challengeName}/${programmingLanguageName}/${name}`,
      description: this.getDescription(githubUser),
      destination
    })
  }

  public async challenge(options: TemplateChallengeOptions): Promise<void> {
    const { destination, githubUser, name } = options
    await copyDirectory(TEMPLATE_CHALLENGE_PATH, destination)
    await this.replaceInDestination({
      name,
      description: this.getDescription(githubUser),
      destination
    })
  }

  public async getProgrammingLanguages(): Promise<string[]> {
    const languages = await fs.promises.readdir(TEMPLATE_SOLUTION_PATH)
    return languages.filter((language) => language !== 'base')
  }

  public async verifySupportedProgrammingLanguage(
    language: string
  ): Promise<void> {
    const languages = await this.getProgrammingLanguages()
    if (!languages.includes(language)) {
      throw new Error('This programming language is not supported yet.')
    }
  }
}

export const template = new Template()
