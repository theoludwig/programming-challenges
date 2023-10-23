import { Builtins, Cli } from "clipanion"

import { GenerateChallengeCommand } from "./commands/generate/challenge.js"
import { GenerateSolutionCommand } from "./commands/generate/solution.js"
import { RunSolutionCommand } from "./commands/run/solution.js"
import { RunTestCommand } from "./commands/run/test.js"
import { SearchCommand } from "./commands/search/index.js"

export const cli = new Cli({
  binaryLabel: "programming-challenges",
  binaryName: "programming-challenges",
  binaryVersion: "1.0.0",
})
cli.register(Builtins.HelpCommand)
cli.register(Builtins.VersionCommand)
cli.register(GenerateChallengeCommand)
cli.register(GenerateSolutionCommand)
cli.register(RunTestCommand)
cli.register(RunSolutionCommand)
cli.register(SearchCommand)
