import fsMock from 'mock-fs'
import fs from 'fs'

import { copyDirectory } from '../copyDirectory'

describe('utils/copyDirectory', () => {
  afterEach(async () => {
    fsMock.restore()
  })

  it('copy the files', async () => {
    fsMock({
      '/source': {
        'default.png': '',
        'index.ts': '',
        '.npmignore': ''
      },
      '/destination': {}
    })

    let destinationDirectoryContent = await fs.promises.readdir('/destination')
    let sourceDirectoryContent = await fs.promises.readdir('/source')
    expect(destinationDirectoryContent.length).toEqual(0)
    expect(sourceDirectoryContent.length).toEqual(3)

    await copyDirectory('/source', '/destination')
    destinationDirectoryContent = await fs.promises.readdir('/destination')
    sourceDirectoryContent = await fs.promises.readdir('/source')
    expect(destinationDirectoryContent.length).toEqual(3)
    expect(sourceDirectoryContent.length).toEqual(3)
    expect(destinationDirectoryContent).toEqual(
      expect.arrayContaining(['default.png', 'index.ts', '.npmignore'])
    )
    expect(sourceDirectoryContent).toEqual(
      expect.arrayContaining(['default.png', 'index.ts', '.npmignore'])
    )
  })
})
