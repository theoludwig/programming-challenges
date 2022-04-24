import { execaCommand } from 'execa'
import ora from 'ora'
import ms from 'ms'

export class Docker {
  static CONTAINER_TAG = 'programming-challenges'
  static SIGSEGV_EXIT_CODE = 139
  static MAXIMUM_TIMEOUT = '1 minute'
  static MAXIMUM_TIMEOUT_MILLISECONDS = ms(Docker.MAXIMUM_TIMEOUT)

  public async build(): Promise<void> {
    const loader = ora('Building the Docker image').start()
    try {
      await execaCommand(`docker build --tag=${Docker.CONTAINER_TAG} ./`)
      loader.stop()
    } catch (error) {
      loader.fail()
      throw error
    }
  }

  public async run(input: string): Promise<string> {
    const subprocess = execaCommand(
      `docker run --interactive --rm ${Docker.CONTAINER_TAG}`,
      {
        input
      }
    )
    let isValid = true
    const timeout = setTimeout(() => {
      subprocess.kill()
      isValid = false
    }, Docker.MAXIMUM_TIMEOUT_MILLISECONDS)
    try {
      const { stdout, stderr } = await subprocess
      if (stderr.length !== 0) {
        throw new Error(stderr)
      }
      clearTimeout(timeout)
      return stdout
    } catch (error: any) {
      if (!isValid) {
        throw new Error(
          `Timeout: time limit exceeded (${Docker.MAXIMUM_TIMEOUT}), try to optimize your solution.`
        )
      }
      if (error.exitCode === Docker.SIGSEGV_EXIT_CODE) {
        throw new Error(
          "Docker run failed: SIGSEGV indicates a segmentation fault (attempts to access a memory location that it's not allowed to access)."
        )
      }
      throw new Error(`Docker run failed: ${error.message as string}`)
    }
  }
}

export const docker = new Docker()
