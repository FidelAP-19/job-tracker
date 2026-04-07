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

  if (loading) return <p style={{ color: 'var(--text-secondary)' }}>Loading dashboard...</p>
  if (error) return <p style={{ color: 'var(--danger-text)' }}>{error}</p>

  const statusData = Object.entries(statusBreakdown).map(([status, count]) => ({
    status,
    count
  }))

  const tooltipStyle = {
    backgroundColor: 'var(--bg-secondary)',
    border: '0.5px solid var(--border)',
    color: 'var(--text-primary)',
    borderRadius: '6px',
    fontSize: '13px',
  }

  return (
    <div>
      <h1 className="page-title">Dashboard</h1>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-label">Total Applications</div>
          <div className="stat-value">{successRate?.total}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Success Rate</div>
          <div className="stat-value" style={{ color: 'var(--accent)' }}>{successRate?.successRate}%</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Response Rate</div>
          <div className="stat-value" style={{ color: 'var(--accent)' }}>{responseRate?.responseRate}%</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Offers</div>
          <div className="stat-value">{successRate?.offers}</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <span className="card-title">Applications by Status</span>
        </div>
        <div className="card-body">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={statusData}>
              <XAxis dataKey="status" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'var(--bg-tertiary)' }} />
              <Bar dataKey="count" fill="var(--accent)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <span className="card-title">Applications Per Week</span>
        </div>
        <div className="card-body">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={perWeek}>
              <XAxis dataKey="week" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="count" stroke="var(--accent)" strokeWidth={2} dot={{ fill: 'var(--accent)', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <span className="card-title">Top Industries</span>
        </div>
        <div className="card-body">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={industries}>
              <XAxis dataKey="industry" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'var(--bg-tertiary)' }} />
              <Bar dataKey="count" fill="#1D9E75" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">Upcoming Interviews (Next 7 Days)</span>
        </div>
        {upcoming.length === 0 ? (
          <div className="card-body">
            <p style={{ color: 'var(--text-secondary)' }}>No upcoming interviews.</p>
          </div>
        ) : (
          <table className="app-table">
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
                  <td className="td-secondary">{round.round_type}</td>
                  <td className="td-secondary">{new Date(round.scheduled_date).toLocaleDateString()}</td>
                  <td>{round.outcome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
  }
