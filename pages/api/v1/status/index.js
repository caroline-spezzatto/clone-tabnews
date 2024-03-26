import database from 'infra/database.js'

async function status(request, response) {
  const updatedAt = new Date().toISOString()
  const postgresVersion = await database.query({
    text: 'SELECT version()'
  })
  const maxConnections = await database.query({
    text: 'SHOW max_connections'
  })
  const usedConnections = await database.query({
    text: 'SELECT count(*) FROM pg_stat_activity'
  })

  response.status(200).json({
    updated_at: updatedAt,
    postgres_version: postgresVersion,
    max_connections: maxConnections,
    used_connections: usedConnections
  })
}

export default status
