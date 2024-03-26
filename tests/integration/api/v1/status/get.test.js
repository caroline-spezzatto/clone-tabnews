test('Get to api/v1/status should return 200', async () => {
  const response = await fetch('http://localhost:3000/api/v1/status')
  expect(response.status).toBe(200)

  const responseBody = await response.json()
  expect(responseBody.updated_at).toBeDefined()
  expect(responseBody.postgres_version).toBeDefined()

  const parseUpdatedAt = new Date(responseBody.updated_at).toISOString()
  expect(responseBody.updated_at).toEqual(parseUpdatedAt)

  // const postgresVersion = responseBody.postgres_version.rows[0].version
  // expect(postgresVersion).toMatch('PostgreSQL 16.0')

  // const usedConnections = responseBody.used_connections.rows[0].count
  // expect(usedConnections).toBe('10')

  // const maxConnections = responseBody.max_connections.rows[0].max_connections
  // expect(maxConnections).toBe('100')
  expect(responseBody.dependencies.database.version).toEqual('16.0')
  expect(responseBody.dependencies.database.max_connection).toEqual('100')
  expect(responseBody.dependencies.database.opened_connection).toEqual('1')
})
