import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
import crypto from 'node:crypto'

import { docker } from './Docker.js'

export class TemporaryFolder {
  public readonly id: string
  public readonly path: string

  public constructor() {
    this.id = crypto.randomUUID()
    this.path = fileURLToPath(new URL(`../../temp/${this.id}`, import.meta.url))
  }

  public async create(): Promise<void> {
    await fs.promises.mkdir(this.path, { recursive: true })
  }

  public async delete(): Promise<void> {
    await fs.promises.rm(this.path, { recursive: true, force: true })
  }

  public static async cleanAll(): Promise<void> {
    try {
      const temporaryPath = fileURLToPath(new URL('../../temp', import.meta.url))
      await fs.promises.rm(temporaryPath, { recursive: true, force: true })
      await docker.removeImages()
    } catch {}
  }
}
