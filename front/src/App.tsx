import { useEffect, useState } from 'react'
import './App.css'

const API_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000'

export interface HealthResponse {
  status: string
  uptime: number
}

function App() {
  const [data, setData] = useState<HealthResponse | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API_URL}/health`)
      const data = await response.json() as HealthResponse
      setData(data)
    }
    fetchData()
  }, [])
  

  return (
    <>
      <h1>Health Check</h1>
      {data ? (
        <div>
          <p>Status: {data.status}</p>
          <p>Uptime: {(data.uptime / 60).toFixed(0)} minutes</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}

export default App
