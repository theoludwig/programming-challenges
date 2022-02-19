#!/usr/bin/env node
import { Cli } from 'clipanion'

import { cli } from './cli.js'

const [, , ...arguments_] = process.argv

cli.runExit(arguments_, Cli.defaultContext).catch(() => {
  console.error('Error occurred...')
  process.exit(1)
})
