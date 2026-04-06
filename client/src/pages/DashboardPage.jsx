import { useState, useEffect } from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import {
  getStatusBreakdown,
  getSuccessRate,
  getResponseRate,
  getApplicationsPerWeek,
  getMostAppliedIndustries,
} from '../services/applicationService'
import { getUpcomingInterviews } from '../services/interviewRoundService'

export default function DashboardPage() {
  const [statusBreakdown, setStatusBreakdown] = useState({})
  const [successRate, setSuccessRate] = useState(null)
  const [responseRate, setResponseRate] = useState(null)
  const [perWeek, setPerWeek] = useState([])
  const [industries, setIndustries] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadDashboard = async () => {
      try{
        const [breakdown, success, response, weekly, ind, up ] = await Promise.all([
          getStatusBreakdown(),
          getSuccessRate(),
          getResponseRate(),
          getApplicationsPerWeek(),
          getMostAppliedIndustries(),
          getUpcomingInterviews(),
        ])
        setStatusBreakdown(breakdown)
        setSuccessRate(success)
        setResponseRate(response)
        setPerWeek(weekly)
        setIndustries(ind)
        setUpcoming(up)

      }catch(err){
        setError(err.response?.data.error || 'Failed to load dashboard')
      }finally{
        setLoading(false)
      }
    }
    loadDashboard()
  }, [])

  if (loading) return <p>Loading dashboard...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  const statusData = Object.entries(statusBreakdown).map(([status, count]) => ({
    status,
    count
  }))

    return (
      <div>
        <h1>Dashboard</h1>
        {/* Stat Cards */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
          <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
              <h3>Total Applications</h3>
              <p style={{ fontSize: '2rem' }}>{successRate?.total}</p>
          </div>
          <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
              <h3>Success Rate</h3>
              <p style={{ fontSize: '2rem' }}>{successRate?.successRate}%</p>
          </div>
          <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
              <h3>Response Rate</h3>
              <p style={{ fontSize: '2rem' }}>{responseRate?.responseRate}%</p>
          </div>
          <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
              <h3>Offers</h3>
              <p style={{ fontSize: '2rem' }}>{successRate?.offers}</p>
          </div>
        </div>

        {/* Status Breakdown */}
        <h2>Applications by Status</h2>
        <ResponsiveContainer width ="100%" height={300}>
          <BarChart data={statusData}>
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#0d6efd" />
          </BarChart>
        </ResponsiveContainer>

        {/* Applications per Week */}
        <h2>Applications Per Week</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={perWeek}>
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#198754" />
          </LineChart>
        </ResponsiveContainer>

        {/* Top Industries */}
        <h2>Top Industries</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={industries}>
            <XAxis dataKey="industry" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#fd7e14" />
          </BarChart>
        </ResponsiveContainer>

        {/* Upcoming Interviews */}
        <h2>Upcoming Interviews (Next 7 Days)</h2>
        {upcoming.length === 0 ? (
          <p>No upcoming interviews.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Role</th>
                <th>Round Type</th>
                <th>Scheduled Date</th>
                <th>Outcome</th>
              </tr>
            </thead>
            <tbody>
              {upcoming.map((round) => (
                <tr key={round.id}>
                  <td>{round.Application?.role_title}</td>
                  <td>{round.round_type}</td>
                  <td>{new Date(round.scheduled_date).toLocaleDateString()}</td>
                  <td>{round.outcome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    )
  }
