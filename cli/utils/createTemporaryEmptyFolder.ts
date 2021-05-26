import path from 'path'
import * as fsWithCallbacks from 'fs'

import { isExistingPath } from '../utils/isExistingPath'

const fs = fsWithCallbacks.promises

export const TEMPORARY_PATH = path.join(__dirname, '..', '..', 'temp')

export const createTemporaryEmptyFolder = async (): Promise<void> => {
  if (await isExistingPath(TEMPORARY_PATH)) {
    await fs.rm(TEMPORARY_PATH, { recursive: true, force: true })
  }
  await fs.mkdir(TEMPORARY_PATH)
}
