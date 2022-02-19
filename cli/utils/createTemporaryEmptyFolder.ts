import path from 'node:path'
import fs from 'node:fs'

import { isExistingPath } from '../utils/isExistingPath.js'

export const TEMPORARY_PATH = path.join(__dirname, '..', '..', 'temp')

export const createTemporaryEmptyFolder = async (): Promise<void> => {
  if (await isExistingPath(TEMPORARY_PATH)) {
    await fs.promises.rm(TEMPORARY_PATH, { recursive: true, force: true })
  }
  await fs.promises.mkdir(TEMPORARY_PATH)
}
