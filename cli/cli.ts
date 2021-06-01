import { Builtins, Cli } from 'clipanion'

import { GenerateChallengeCommand } from './commands/generate/challenge'
import { RunTestCommand } from './commands/run/test'

export const cli = new Cli({
  binaryLabel: 'programming-challenges',
  binaryName: 'programming-challenges',
  binaryVersion: '1.0.0'
})
cli.register(Builtins.HelpCommand)
cli.register(Builtins.VersionCommand)
cli.register(RunTestCommand)
cli.register(GenerateChallengeCommand)
