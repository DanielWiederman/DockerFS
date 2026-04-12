import { useEffect, useState } from 'react'
import './App.css'
import { DB_TEST_URL, HEALTH_URL, type DbTestResponse, type HealthResponse } from './apiUrls'

function App() {
  const [healthData, setHealthData] = useState<HealthResponse | null>(null)
  const [dbData, setDbData] = useState<DbTestResponse | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(HEALTH_URL)
      const data = await response.json() as HealthResponse
      setHealthData(data)
    }
    fetchData()
  }, [])
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(DB_TEST_URL)
      const data = await response.json() as DbTestResponse
      setDbData(data)
    }
    fetchData()
  }, [])

  return (
    <>
      <h1>Health Check</h1>
      {healthData ? (
        <div>
          <p>Status: {healthData.status}</p>
          <p>Uptime: {(healthData.uptime / 60).toFixed(0)} minutes</p>
        </div>
      ) : (
        <p>Loading health data...</p>
      )}
      <h1>Database Test</h1>
      {dbData ? (
        <div>
          <p>Success: {dbData.success ? 'Yes' : 'No'}</p>
          <p>Message: {dbData.message}</p>
          <p>DB Time: {dbData.db_time}</p>
        </div>
      ) : (
        <p>Loading database data...</p>
      )}
    </>
  )
}

export default App
