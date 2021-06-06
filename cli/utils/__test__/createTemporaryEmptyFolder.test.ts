import fsMock from 'mock-fs'
import fs from 'fs'

import {
  TEMPORARY_PATH,
  createTemporaryEmptyFolder
} from '../createTemporaryEmptyFolder'
import { isExistingPath } from '../isExistingPath'

describe('utils/createTemporaryEmptyFolder', () => {
  afterEach(async () => {
    fsMock.restore()
  })

  it('should create the temporary folder', async () => {
    fsMock({})
    expect(await isExistingPath(TEMPORARY_PATH)).toBeFalsy()
    await createTemporaryEmptyFolder()
    expect(await isExistingPath(TEMPORARY_PATH)).toBeTruthy()
  })

  it('should remove and create again the temporary folder', async () => {
    fsMock({
      [TEMPORARY_PATH]: {
        'file.txt': ''
      }
    })
    expect(await isExistingPath(TEMPORARY_PATH)).toBeTruthy()
    expect((await fs.promises.readdir(TEMPORARY_PATH)).length).toEqual(1)
    await createTemporaryEmptyFolder()
    expect((await fs.promises.readdir(TEMPORARY_PATH)).length).toEqual(0)
  })
})
