#!/usr/bin/env node
import { Cli } from 'clipanion'

import { cli } from './cli'

const [, , ...args] = process.argv

cli.runExit(args, Cli.defaultContext).catch(() => {
  console.error('Error occurred...')
  process.exit(1)
})
