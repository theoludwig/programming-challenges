import execa from 'execa'
import ora from 'ora'

const CONTAINER_TAG = 'programming-challenges'

class Docker {
  public async build(): Promise<void> {
    const loader = ora('Building the Docker image').start()
    try {
      await execa.command(`docker build --tag=${CONTAINER_TAG} ./`)
      loader.succeed()
    } catch (error) {
      loader.fail()
      throw error
    }
  }

  public async run(input: string): Promise<string> {
    const { stdout } = await execa.command(
      `docker run --interactive --rm ${CONTAINER_TAG}`,
      {
        input
      }
    )
    return stdout
  }
}

export const docker = new Docker()
