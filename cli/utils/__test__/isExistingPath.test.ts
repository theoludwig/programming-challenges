import fsMock from 'mock-fs'

import { isExistingPath } from '../isExistingPath'

describe('utils/isExistingFile', () => {
  afterEach(async () => {
    fsMock.restore()
  })

  it('should return true if the file exists', async () => {
    fsMock({
      '/file.txt': ''
    })
    expect(await isExistingPath('/file.txt')).toBeTruthy()
  })

  it("should return false if the file doesn't exists", async () => {
    fsMock({
      '/file.txt': ''
    })
    expect(await isExistingPath('/randomfile.txt')).toBeFalsy()
  })
})
