import { fetch, Agent, RequestInit } from 'undici'

const socketPath = process.env.SOCKET ?? '/rocketpool-cli.sock'

export async function load<T>(path: string): Promise<T> {
  const options: RequestInit = {
    dispatcher: new Agent({
      connect: {
        socketPath
      }
    })
  }

  console.log('fetching', path)

  return await fetch('http://rocketpool/api/v1' + path, options)
    .then(r => r.json() as Promise<{ data: T }>)
    .then(r => r.data)
}
