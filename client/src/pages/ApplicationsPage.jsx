import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAllApplications, deleteApplication } from '../services/applicationService'
import StatusBadge from '../components/StatusBadge'

function ApplicationsPage() {
  const navigate = useNavigate()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      const data = await getAllApplications()
      setApplications(data)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load applications')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this application?')) return
    try {
      await deleteApplication(id)
      setApplications(applications.filter(app => app.id !== id))
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete application')
    }
  }

  if (loading) return <p style={{ color: 'var(--text-secondary)', padding: '20px' }}>Loading applications...</p>
  if (error) return <p style={{ color: 'var(--danger-text)', padding: '20px' }}>{error}</p>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 className="page-title" style={{ margin: 0 }}>Applications</h1>
        <button className="btn btn-primary" onClick={() => navigate('/applications/new')}>
          + New Application
        </button>
      </div>

      <div className="card">
        <table className="app-table">
          <thead>
            <tr>
              <th>Role</th>
              <th>Company</th>
              <th>Status</th>
              <th>Date Applied</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app.id}>
                <td>{app.role_title}</td>
                <td className="td-secondary">{app.Company?.name || 'N/A'}</td>
                <td><StatusBadge status={app.status} /></td>
                <td className="td-secondary">{app.date_applied}</td>
                <td>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <Link to={`/applications/${app.id}`} className="btn" style={{ fontSize: '12px', padding: '4px 10px' }}>View</Link>
                    <button className="btn" style={{ fontSize: '12px', padding: '4px 10px' }} onClick={() => navigate(`/applications/${app.id}/edit`)}>Edit</button>
                    <button className="btn btn-danger" style={{ fontSize: '12px', padding: '4px 10px' }} onClick={() => handleDelete(app.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ApplicationsPage