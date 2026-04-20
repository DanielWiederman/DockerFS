const API_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000'

export const HEALTH_URL = `${API_URL}/health`
export const POSTGRES_TEST_URL = `${API_URL}/db-postgres-test`
export const MONGO_TEST_URL = `${API_URL}/db-mongodb-test`

export interface HealthResponse {
  status: string
  uptime: number
}

export interface PostgresTestResponse {
  success: boolean
  message: string
  db_time: string
}

export interface MongoTestResponse {
  success: boolean
  message: string
}