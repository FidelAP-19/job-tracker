import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createContact, getContactById, updateContact } from '../services/contactService'
import { getAllCompanies } from '../services/companyService'

export default function ContactFormPage() {

    const { id } = useParams()
    const navigate = useNavigate()
    const isEditing = Boolean(id)

    const [ formData, setFormData ] = useState({
        name:'',
        company_id:'',
        role:'',
        email:'',
        linkedin_url:'',
        notes:'',
    })

    const [ companies, setCompanies ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null)

    useEffect(() => {
        const loadData = async () => {
            try{
                const companyList = await getAllCompanies()
                setCompanies(companyList)

                if(isEditing){
                    const con = await getContactById(id)
                    setFormData({
                        name: con.name || '',
                        company_id: con.company_id || '',
                        role:con.role || '',
                        email: con.email || '',
                        linkedin_url: con.linkedin_url || '',
                        notes: con.notes || '',
                    })
                }

            }catch(err){
                setError(err.response?.data?.error || "Failed to load data.")
            }
        }
        loadData()
    }, [id, isEditing])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({...prev, [name]: value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try{
            if(isEditing){
                await updateContact(id, formData) 
            }else{
                await createContact(formData)
            }
            navigate('/contacts/')
        }catch(err){
            setError(err.response?.data?.error || "Failed to save contact")
            setLoading(false)
        }
    }


    return(
        <div>
            <h1>{isEditing ? 'Edit Contact' : 'New Contact'}</h1>
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
                    <label>Company</label>
                    <select 
                    name="company_id"
                    value={formData.company_id}
                    onChange={handleChange}
                    >
                        <option value="">-- Select a Company --</option>
                        {companies.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>

                </div>

                <div>
                    <label>Role</label>
                    <input 
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    />
                </div>

                <div>
                    <label>E-mail</label>
                    <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    />
                </div>

                <div>
                    <label>LinkedIn</label>
                    <input
                    name="linkedin_url"
                    value={formData.linkedin_url}
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
                    {loading ? 'Saving..' : isEditing ? 'Update Contact' : 'Create Contact'}
                </button>
                {' | '}
                <button typed="button" onClick={() => navigate(`/contacts`)}>
                    Cancel
                </button>
            </form>
        </div>
    )
}