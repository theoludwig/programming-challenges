import execa from 'execa'
import ora from 'ora'

const CONTAINER_TAG = 'programming-challenges'

class Docker {
  public async build (): Promise<void> {
    const loader = ora('Building the Docker image').start()
    try {
      await execa.command(`docker build --tag=${CONTAINER_TAG} ./`)
      loader.stop()
    } catch (error) {
      loader.fail()
      throw error
    }
  }

  public async run (input: string): Promise<string> {
    const subprocess = execa.command(
      `docker run --interactive --rm ${CONTAINER_TAG}`,
      {
        input
      }
    )
    setTimeout(() => {
      subprocess.kill('SIGTERM', {
        forceKillAfterTimeout: 30_000
      })
    }, 1_000)
    const { stdout, stderr } = await subprocess
    if (stderr.length !== 0) {
      throw new Error(stderr)
    }
    return stdout
  }
}

export const docker = new Docker()
