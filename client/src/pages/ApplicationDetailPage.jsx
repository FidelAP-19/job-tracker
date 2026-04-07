import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getApplicationById } from '../services/applicationService'
import StatusBadge from '../components/StatusBadge'

export default function ApplicationDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [application, setApplication] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadApplication = async () => {
      try {
        const data = await getApplicationById(id)
        setApplication(data)
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load application.')
      } finally {
        setLoading(false)
      }
    }
    loadApplication()
  }, [id])

  if (loading) return <p style={{ color: 'var(--text-secondary)' }}>Loading...</p>
  if (error) return <p style={{ color: 'var(--danger-text)' }}>{error}</p>
  if (!application) return null

  return (
    <div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <button className="btn" onClick={() => navigate('/applications')}>← Back</button>
        <button className="btn" onClick={() => navigate(`/applications/${id}/edit`)}>Edit</button>
      </div>

      <h1 className="page-title">{application.role_title}</h1>

      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-body">
          <div className="detail-field"><strong>Company</strong>{application.Company?.name}</div>
          <div className="detail-field"><strong>Industry</strong>{application.Company?.industry}</div>
          <div className="detail-field"><strong>Status</strong><StatusBadge status={application.status} /></div>
          <div className="detail-field"><strong>Date Applied</strong>{application.date_applied}</div>
          <div className="detail-field"><strong>Salary Estimate</strong>{application.salary_estimate ? `$${application.salary_estimate.toLocaleString()}` : 'N/A'}</div>
          <div className="detail-field"><strong>Notes</strong>{application.notes || 'None'}</div>
        </div>
      </div>

      <h2 style={{ fontSize: '16px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '16px' }}>Interview Rounds</h2>

      <div className="card">
        {application.InterviewRounds?.length === 0 ? (
          <div className="card-body">
            <p style={{ color: 'var(--text-secondary)' }}>No interview rounds yet.</p>
          </div>
        ) : (
          <table className="app-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Scheduled Date</th>
                <th>Outcome</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {application.InterviewRounds?.map((round) => (
                <tr key={round.id}>
                  <td>{round.round_type}</td>
                  <td className="td-secondary">{round.scheduled_date ? new Date(round.scheduled_date).toLocaleDateString() : 'TBD'}</td>
                  <td>{round.outcome}</td>
                  <td className="td-secondary">{round.notes || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}