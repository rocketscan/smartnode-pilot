import http from 'node:http'

const socketPath = process.env.SOCKET ?? '/rocketpool-cli.sock'

export async function load(path: string) {
  const agent = new http.Agent({
    socketPath
  } as http.AgentOptions & { socketPath: string })

  return await fetch('http://rocketpool/api/v1' + path, {
    agent
  } as RequestInit & { agent: http.Agent })
    .then(r => r.json())
    .then(r => r.data)
}
