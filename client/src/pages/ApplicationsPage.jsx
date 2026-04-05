import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAllApplications, deleteApplication } from '../services/applicationService'

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

  if (loading) return <p>Loading applications...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h1>Applications</h1>
      <Link to="/applications/new">+ Add Application</Link>
      <button onClick={() => navigate('/applications/new')}>
        + New Application
      </button>
      <table>
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
              <td>{app.Company?.name || 'N/A'}</td>
              <td>{app.status}</td>
              <td>{app.date_applied}</td>
              <td>
                <Link to={`/applications/${app.id}`}>View</Link>
                {' | '}
                <button onClick={ () => navigate(`/applications/${app.id}/edit`)}>Edit</button>
                {' | '}
                <button onClick={() => handleDelete(app.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ApplicationsPage