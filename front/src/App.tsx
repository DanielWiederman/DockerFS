import { useEffect, useState } from 'react'
import './App.css'
import { HEALTH_URL, MONGO_TEST_URL, POSTGRES_TEST_URL, type HealthResponse, type MongoTestResponse, type PostgresTestResponse } from './apiUrls'

function App() {
  const [healthData, setHealthData] = useState<HealthResponse | null>(null)
  const [postgresData, setPostgresData] = useState<PostgresTestResponse | null>(null)
  const [mongoData, setMongoData] = useState<MongoTestResponse | null>(null)
  const [serverStatus, setServerStatus] = useState<'ok' | 'error'>('error')
  const [postgresStatus, setPostgresStatus] = useState<'ok' | 'error'>('error')
  const [mongoStatus, setMongoStatus] = useState<'ok' | 'error'>('error')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(HEALTH_URL)
        const data = await response.json() as HealthResponse
        setHealthData(data)
        setServerStatus('ok')
      } catch (error) {
        setServerStatus('error')
      }
    }
    fetchData()
    const interval = setInterval(fetchData, 60000)
    return () => clearInterval(interval)
  }, [])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(POSTGRES_TEST_URL)
        const data = await response.json() as PostgresTestResponse
        setPostgresData(data)
        setPostgresStatus(data.success ? 'ok' : 'error')
      } catch (error) {
        setPostgresStatus('error')
      }
    }
    fetchData()
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(MONGO_TEST_URL)
        const data = await response.json() as MongoTestResponse
        setMongoData(data)
        setMongoStatus(data.success ? 'ok' : 'error')
      } catch (error) {
        setMongoStatus('error')
      }
    }
    fetchData()
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div className="status-badges">
        <div className={`badge ${serverStatus}`}>
          <span className="badge-dot"></span>
          <span className="badge-label">Server</span>
        </div>
        <div className={`badge ${postgresStatus}`}>
          <span className="badge-dot"></span>
          <span className="badge-label">Postgres</span>
        </div>
        <div className={`badge ${mongoStatus}`}>
          <span className="badge-dot"></span>
          <span className="badge-label">MongoDB</span>
        </div>
      </div>
      <h1>Health Check</h1>
      {healthData ? (
        <div>
          <p>Status: {healthData.status}</p>
          <p>Uptime: {(healthData.uptime / 60).toFixed(0)} minutes</p>
        </div>
      ) : (
        <p>Loading health data...</p>
      )}
      <h1>Postgres Test</h1>
      {postgresData ? (
        <div>
          <p>Success: {postgresData.success ? 'Yes' : 'No'}</p>
          <p>Message: {postgresData.message}</p>
          <p>DB Time: {postgresData.db_time}</p>
        </div>
      ) : (
        <p>Loading postgres data...</p>
      )}
      <h1>MongoDB Test</h1>
      {mongoData ? (
        <div>
          <p>Success: {mongoData.success ? 'Yes' : 'No'}</p>
          <p>Message: {mongoData.message}</p>
        </div>
      ) : (
        <p>Loading mongodb data...</p>
      )}
    </>
  )
}

export default App
