import path from 'path'
import fs from 'fs'

import { isExistingPath } from '../utils/isExistingPath'

export const TEMPORARY_PATH = path.join(__dirname, '..', '..', 'temp')

export const createTemporaryEmptyFolder = async (): Promise<void> => {
  if (await isExistingPath(TEMPORARY_PATH)) {
    await fs.promises.rm(TEMPORARY_PATH, { recursive: true, force: true })
  }
  await fs.promises.mkdir(TEMPORARY_PATH)
}
