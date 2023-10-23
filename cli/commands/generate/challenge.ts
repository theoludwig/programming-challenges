import { Command, Option } from "clipanion"
import * as typanion from "typanion"
import chalk from "chalk"

import { Challenge } from "../../services/Challenge.js"

export class GenerateChallengeCommand extends Command {
  public static override paths = [["generate", "challenge"]]

  public static override usage = {
    description: "Create the basic files needed for a new challenge.",
  }

  public challenge = Option.String("--challenge", {
    description: "The new challenge name to generate.",
    required: true,
    validator: typanion.isString(),
  })

  public githubUser = Option.String("--github-user", {
    description: "Your GitHub user.",
    required: true,
    validator: typanion.isString(),
  })

  public async execute(): Promise<number> {
    try {
      const challenge = await Challenge.generate({
        name: this.challenge,
        githubUser: this.githubUser,
      })
      console.log(
        `${chalk.bold.green("Success:")} created the new challenge at ${
          challenge.path
        }.`,
      )
      return 0
    } catch (error) {
      if (error instanceof Error) {
        console.error(`${chalk.bold.red("Error:")} ${error.message}`)
      }
      return 1
    }
  }
}
