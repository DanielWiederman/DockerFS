const API_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000'

export const HEALTH_URL = `${API_URL}/health`
export const DB_TEST_URL = `${API_URL}/db-test`

export interface HealthResponse {
  status: string
  uptime: number
}

export interface DbTestResponse {
  success: boolean
  message: string
  db_time: string
}