import execa from 'execa'
import getStream from 'get-stream'

const CONTAINER_TAG = 'programming-challenges'

class Docker {
  public async build (): Promise<void> {
    const stream = execa.command(`docker build --tag=${CONTAINER_TAG} ./`).stdout
    if (stream == null) {
      return
    }
    stream.pipe(process.stdout)
    await getStream(stream)
    console.log()
  }

  public async run (input: string): Promise<string> {
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
