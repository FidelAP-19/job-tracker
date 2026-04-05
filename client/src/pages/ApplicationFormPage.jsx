import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createApplication, getApplicationById, updateApplication } from '../services/applicationService'
import { getAllCompanies } from '../services/companyService'

export default function ApplicationFormPage() {
    const{ id } = useParams()
    const navigate = useNavigate()
    const isEditing = Boolean(id)

    const [formData, setFormData] = useState({
        role_title: '',
        company_id: '',
        status: 'Applied',
        date_applied: '',
        salary_estimate: '',
        notes: '',
        user_id: 1,  
    })

    const [companies, setCompanies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadData = async () => {
          try {
            const companyList = await getAllCompanies()
            setCompanies(companyList)
    
            if (isEditing) {
              const app = await getApplicationById(id)
              setFormData({
                role_title: app.role_title || '',
                company_id: app.company_id || '',
                status: app.status || 'Applied',
                date_applied: app.date_applied || '',
                salary_estimate: app.salary_estimate || '',
                notes: app.notes || '',
              })
            }
          } catch (err) {
            setError(err.message || 'Failed to load data.')
          }
        }
    
        loadData()
      }, [id, isEditing])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        
        try {
            if (isEditing) {
                await updateApplication(id, formData)
            } else {
                await createApplication(formData)
            }
            navigate('/applications')
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to save application.')
            setLoading(false)
        }
    }
    
    return (
        <div>
            <h1>{isEditing ? 'Edit Application' : 'New Application'}</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
        <div>
          <label>Role Title</label>
          <input
            name="role_title"
            value={formData.role_title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
            <label>Company</label>
            <select
            name="company_id"
            value={formData.company_id}
            onChange={handleChange}
            required
            >
                <option value="">-- Select a Company --</option>
                {companies.map((c) => (
                    <option key={c.id} value ={c.id}>
                        {c.name}
                    </option>
                ))}
            </select>
        </div>

        <div>
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
                <option>Applied</option>
                <option>Phone Screen</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
                <option>Withdrawn</option>
            </select>
        </div>
        
        <div>
          <label>Date Applied</label>
          <input
            type="date"
            name="date_applied"
            value={formData.date_applied}
            onChange={handleChange}
            required
          />
        </div>

        <div>
            <label>Salary Estimate</label>
            <input 
                type="number"
                name="salary_estimate"
                value={formData.salary_estimate}
                onChange={handleChange}
            />
        </div>

        <div>
          <label>Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : isEditing ? 'Update Application' : 'Create Application'}
        </button>
        {' | '}
        <button type="button" onClick={() => navigate('/applications')}>
          Cancel
        </button>
      </form>

    </div>
    )

}