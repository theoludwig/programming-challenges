import fsMock from 'mock-fs'

import { isExistingPath } from '../isExistingPath.js'

describe('utils/isExistingFile', () => {
  afterEach(() => {
    fsMock.restore()
  })

  it('should return true if the file exists', async () => {
    fsMock({
      '/file.txt': ''
    }, { createCwd: false })
    expect(await isExistingPath('/file.txt')).toBeTruthy()
  })

  it("should return false if the file doesn't exists", async () => {
    fsMock({
      '/file.txt': ''
    }, { createCwd: false })
    expect(await isExistingPath('/randomfile.txt')).toBeFalsy()
  })
})
