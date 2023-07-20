import { execaCommand } from 'execa'
import ms from 'ms'

import { parseCommandOutput } from '../utils/parseCommandOutput.js'

export interface DockerRunResult {
  stdout: string
}

export class Docker {
  public static readonly CONTAINER_BASE_TAG = 'programming-challenges'
  public static readonly SIGSEGV_EXIT_CODE = 139
  public static readonly MAXIMUM_TIMEOUT = '1 minute'
  public static readonly MAXIMUM_TIMEOUT_MILLISECONDS = ms(
    Docker.MAXIMUM_TIMEOUT
  )

  public getContainerTag(id: string): string {
    return `${Docker.CONTAINER_BASE_TAG}:${id}`
  }

  public async getImages(): Promise<string[]> {
    try {
      const { stdout } = await execaCommand(
        `docker images -q --filter=reference="${Docker.CONTAINER_BASE_TAG}:*"`,
        { shell: true }
      )
      return parseCommandOutput(stdout)
    } catch {
      return []
    }
  }

  public async removeImages(): Promise<void> {
    try {
      const images = await this.getImages()
      if (images.length === 0) {
        return
      }
      await execaCommand(`docker rmi -f ${images.join(' ')}`, {
        shell: true
      })
    } catch {}
  }

  public async build(id: string): Promise<void> {
    try {
      await execaCommand(`docker build --tag=${this.getContainerTag(id)} ./`)
    } catch (error: any) {
      throw new Error(`Docker build failed.\n${error.message as string}`)
    }
  }

  public async run(input: string, id: string): Promise<DockerRunResult> {
    const subprocess = execaCommand(
      `docker run --interactive --rm ${this.getContainerTag(id)}`,
      {
        input
      }
    )
    try {
      const { stdout, stderr } = await subprocess
      if (stderr.length > 0) {
        throw new Error(stderr)
      }
      return {
        stdout
      }
    } catch (error: any) {
      if (error.exitCode === Docker.SIGSEGV_EXIT_CODE) {
        throw new Error(
          "Docker run failed.\nSIGSEGV indicates a segmentation fault (attempts to access a memory location that it's not allowed to access)."
        )
      }
      throw new Error(`Docker run failed.\n${error.message as string}`)
    }
  }
}

export const docker = new Docker()
