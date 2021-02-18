import path from 'path'
import * as fsWithCallbacks from 'fs'
const fs = fsWithCallbacks.promises

async function deleteAllFilesExceptOne(
  directoryPath: string,
  fileNameToNotDelete: string
): Promise<void> {
  const fileNames = await fs.readdir(path.resolve(directoryPath))
  for (const name of fileNames) {
    const fileNamePath = path.resolve(directoryPath, name)
    const stats = await fs.stat(fileNamePath)
    if (stats.isDirectory()) {
      await fs.rmdir(fileNamePath, { recursive: true })
    } else if (name !== fileNameToNotDelete) {
      await fs.unlink(fileNamePath)
    }
  }
}

export default deleteAllFilesExceptOne
