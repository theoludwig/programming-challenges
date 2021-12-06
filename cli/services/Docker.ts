import execa from 'execa'
import ora from 'ora'

class Docker {
  static CONTAINER_TAG = 'programming-challenges'
  static SIGSEGV_EXIT_CODE = 139

  public async build (): Promise<void> {
    const loader = ora('Building the Docker image').start()
    try {
      await execa.command(`docker build --tag=${Docker.CONTAINER_TAG} ./`)
      loader.stop()
    } catch (error) {
      loader.fail()
      throw error
    }
  }

  public async run (input: string): Promise<string> {
    const subprocess = execa.command(
      `docker run --interactive --rm ${Docker.CONTAINER_TAG}`,
      {
        input
      }
    )
    try {
      const { stdout, stderr } = await subprocess
      if (stderr.length !== 0) {
        throw new Error(stderr)
      }
      return stdout
    } catch (error: any) {
      if (error.exitCode === Docker.SIGSEGV_EXIT_CODE) {
        throw new Error('Docker run failed: SIGSEGV indicates a segmentation fault (attempts to access a memory location that it\'s not allowed to access).')
      }
      throw new Error(`Docker run failed: ${error.message as string}`)
    }
  }
}

export const docker = new Docker()
