export interface ProgrammingLanguageOptions {
  name: string
  fileExtension: string
  executable: string
}

export class ProgrammingLanguage implements ProgrammingLanguageOptions {
  public name: string
  public fileExtension: string
  public executable: string

  constructor(options: ProgrammingLanguageOptions) {
    const { name, fileExtension, executable } = options
    this.name = name
    this.fileExtension = fileExtension
    this.executable = executable
  }

  static get(languageName: string): ProgrammingLanguage {
    const programmingLanguage = programmingLanguages.find(
      (programmingLanguage) => {
        return programmingLanguage.name === languageName
      }
    )
    if (programmingLanguage == null) {
      throw new Error(`Sadly, this ${languageName} is not supported yet.`)
    }
    return programmingLanguage
  }
}

export const programmingLanguages: ProgrammingLanguage[] = [
  new ProgrammingLanguage({
    name: 'Python',
    executable: 'python',
    fileExtension: '.py'
  })
]
