import execa from 'execa'
import ora from 'ora'

class Docker {
  static CONTAINER_TAG = 'programming-challenges'

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
    const { stdout, stderr } = await subprocess
    if (stderr.length !== 0) {
      throw new Error(stderr)
    }
    return stdout
  }
}

export const docker = new Docker()
