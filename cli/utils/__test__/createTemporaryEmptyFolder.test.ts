import fs from 'node:fs'

import fsMock from 'mock-fs'

import {
  TEMPORARY_PATH,
  createTemporaryEmptyFolder
} from '../createTemporaryEmptyFolder'
import { isExistingPath } from '../isExistingPath'

describe('utils/createTemporaryEmptyFolder', () => {
  afterEach(async () => {
    fsMock.restore()
  })

  it('should remove and create again the temporary folder', async () => {
    fsMock({
      [TEMPORARY_PATH]: {
        'file.txt': ''
      }
    }, { createCwd: false })
    expect(await isExistingPath(TEMPORARY_PATH)).toBeTruthy()
    expect((await fs.promises.readdir(TEMPORARY_PATH)).length).toEqual(1)
    await createTemporaryEmptyFolder()
    expect((await fs.promises.readdir(TEMPORARY_PATH)).length).toEqual(0)
  })
})
