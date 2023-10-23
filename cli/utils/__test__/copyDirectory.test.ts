import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

import fsMock from "mock-fs"

import { copyDirectory } from "../copyDirectory.js"

await test("utils/copyDirectory", async (t) => {
  t.afterEach(() => {
    fsMock.restore()
  })

  await t.test("copy the files", async () => {
    fsMock({
      "/source": {
        "default.png": "",
        "index.ts": "",
      },
      "/destination": {},
    })

    let destinationDirectoryContent = await fs.promises.readdir("/destination")
    let sourceDirectoryContent = await fs.promises.readdir("/source")
    assert.strictEqual(destinationDirectoryContent.length, 0)
    assert.strictEqual(sourceDirectoryContent.length, 2)

    await copyDirectory("/source", "/destination")
    destinationDirectoryContent = await fs.promises.readdir("/destination")
    sourceDirectoryContent = await fs.promises.readdir("/source")
    assert.strictEqual(destinationDirectoryContent.length, 2)
    assert.strictEqual(sourceDirectoryContent.length, 2)
    assert.deepStrictEqual(destinationDirectoryContent, [
      "default.png",
      "index.ts",
    ])
    assert.deepStrictEqual(sourceDirectoryContent, ["default.png", "index.ts"])
  })

  await t.test("copy the files and folders recursively", async () => {
    fsMock({
      "/source": {
        "random-folder": {
          "default.png": "",
          "second-random-folder": {
            "mycode.ts": "",
          },
        },
        "index.ts": "",
      },
      "/destination": {},
    })

    let destinationDirectoryContent = await fs.promises.readdir("/destination")
    let sourceDirectoryContent = await fs.promises.readdir("/source")
    let randomFolderContent = await fs.promises.readdir("/source/random-folder")
    let secondRandomFolderContent = await fs.promises.readdir(
      "/source/random-folder/second-random-folder",
    )
    assert.strictEqual(randomFolderContent.length, 2)
    assert.strictEqual(secondRandomFolderContent.length, 1)
    assert.strictEqual(destinationDirectoryContent.length, 0)
    assert.strictEqual(sourceDirectoryContent.length, 2)

    await copyDirectory("/source", "/destination")
    destinationDirectoryContent = await fs.promises.readdir("/destination")
    sourceDirectoryContent = await fs.promises.readdir("/source")
    randomFolderContent = await fs.promises.readdir(
      "/destination/random-folder",
    )
    secondRandomFolderContent = await fs.promises.readdir(
      "/destination/random-folder/second-random-folder",
    )
    assert.strictEqual(destinationDirectoryContent.length, 2)
    assert.strictEqual(sourceDirectoryContent.length, 2)
    assert.deepStrictEqual(destinationDirectoryContent, [
      "index.ts",
      "random-folder",
    ])
    assert.deepStrictEqual(sourceDirectoryContent, [
      "index.ts",
      "random-folder",
    ])
    assert.strictEqual(randomFolderContent.length, 2)
    assert.strictEqual(secondRandomFolderContent.length, 1)
    assert.deepStrictEqual(randomFolderContent, [
      "default.png",
      "second-random-folder",
    ])
    assert.deepStrictEqual(secondRandomFolderContent, ["mycode.ts"])
  })
})
