#!/usr/bin/env node
import { Cli } from "clipanion"

import { cli } from "./cli.js"

const [, , ...arguments_] = process.argv

await cli.runExit(arguments_, Cli.defaultContext)
