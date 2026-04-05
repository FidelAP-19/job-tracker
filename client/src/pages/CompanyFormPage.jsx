import {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createCompany, getCompanyById, updateCompany } from '../services/companyService'

export default function CompaniesFormPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEditing = Boolean(id)

    const [ formData, setFormData ] = useState({
        name: '',
        industry: '',
        website: '',
        notes: '',
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadData = async () => {
            try{
                if(isEditing){
                    const com = await getCompanyById(id)
                    setFormData({
                        name: com.name || '',
                        industry: com.industry || '',
                        website: com.website || '',
                        notes: com.notes || '',
                    })
                }
            }catch(err){
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

        try{
            if (isEditing){
                await updateCompany(id, formData)
            }else{
                await createCompany(formData)
            }
            navigate('/companies/')
        }catch(err){
            setError(err.response?.data?.error || "Failed to save company.")
            setLoading(false)
        }
    }

    return(
        <div>
            <h1>{isEditing ? 'Edit Company' : 'New Company'}</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    />
                </div>

                <div>
                    <label>Industry</label>
                    <input 
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Website</label>
                    <input 
                    name="website"
                    value={formData.website}
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
                    {loading ? 'Saving...': isEditing ? 'Update Company' : 'Create Company'}
                </button>
                {' | '}
                <button type="button" onClick={() => navigate("/companies")}>
                    Cancel
                </button>
            </form>
        </div>
    )
}