import { useState, useEffect } from 'react'
import { useNavigate, useParams }  from 'react-router-dom'
import { getContactById } from '../services/contactService'

export default function ContactDetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [ contact, setContact ] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState(null)

    useEffect(() => {
        const loadContact = async () => {
            try {
                const data = await getContactById(id)
                setContact(data)
            }catch(err){
                setError(err.response?.data?.error || 'Failed to load to contact.')
            }finally{
                setLoading(false)
            }
        }
        loadContact()
    },[id])

    if (loading) return <p>Loading...</p>
    if (error) return <p style={{ color: 'red' }}>{error}</p>
    if (!contact) return null

    return(
        <div>
            <button onClick={() => navigate(`/contacts`)}>Back</button>
            <button onClick={() => navigate(`/contacts/${id}/edit`)}>Edit</button>
             <h1>{contact.name}</h1>
             <p><strong>Role:</strong> {contact.role}</p>
             <p><strong>Email:</strong> {contact.email}</p>
             <p><strong>LinkedIn:</strong> {contact.linkedin_url}</p>
             <p><strong>Notes:</strong> {contact.notes || 'None'}</p>

             <hr />
            
            <h2>Company</h2>
            {!contact.Company ? (
                <p>No Company information for {contact.name} is available at this moment</p>
            ) : (
             <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Industry</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{contact.Company?.name}</td>
                        <td>{contact.Company?.industry}</td>
                        <td><button onClick={() => navigate(`/companies/${contact.Company.id}`)}>View</button></td>
                    </tr>
                </tbody>
             </table>
            )
        }
        </div>
       
    )
}