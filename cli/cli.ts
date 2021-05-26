import { Builtins, Cli } from 'clipanion'

import { RunTestCommand } from './commands/run/test'

export const cli = new Cli({
  binaryLabel: 'programming-challenges',
  binaryName: 'programming-challenges',
  binaryVersion: '1.0.0'
})
cli.register(Builtins.HelpCommand)
cli.register(Builtins.VersionCommand)
cli.register(RunTestCommand)
