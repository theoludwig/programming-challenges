
import { Builtins, Cli } from 'clipanion'

export const cli = new Cli({
  binaryLabel: 'programming-challenges',
  binaryName: 'programming-challenges',
  binaryVersion: '1.0.0'
})
cli.register(Builtins.HelpCommand)
cli.register(Builtins.VersionCommand)
