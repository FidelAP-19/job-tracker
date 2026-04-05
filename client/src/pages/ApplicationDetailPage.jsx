import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getApplicationById } from '../services/applicationService'
import StatusBadge from '../components/StatusBadge'

export default function ApplicationDetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [ application, setApplication ] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadApplication = async () => {
            try{
                const data = await getApplicationById(id)
                setApplication(data)
            } catch (err){
                setError(err.response?.data?.error || 'Failed to load application.')
            }finally{
                setLoading(false)
            }
        }
        loadApplication()
    }, [id])

    if (loading) return <p>Loading...</p>
    if (error) return <p style={{ color: 'red' }}>{error}</p>
    if (!application) return null

    return(

        <div>
            <button onClick={() => navigate(`/applications`)}>←Back</button>
            <button onClick={() => navigate(`/applications/${id}/edit`)}>Edit</button>

            <h1>{application.role_title}</h1>
            <p><strong>Company:</strong> {application.Company?.name}</p>
            <p><strong>Industry:</strong> {application.Company?.industry}</p>
            <p><strong>Status:</strong> <StatusBadge status={application.status} /></p>
            <p><strong>Date Applied:</strong> {application.date_applied}</p>
            <p><strong>Salary Estimate:</strong> {application.salary_estimate ? `$${application.salary_estimate.toLocaleString()}` : 'N/A'}</p>
            <p><strong>Notes:</strong> {application.notes || 'None'}</p>

            <hr />

            <h2>Interview Rounds</h2>
            {application.InterviewRounds?.length === 0 ? (
                <p>No interview rounds yet</p>
            ) : (
                <table>
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
                                <td>{round.scheduled_date ? new Date(round.scheduled_date).toLocaleDateString() : 'TBD'}</td>
                                <td>{round.outcome}</td>
                                <td>{round.notes || '—'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
        }
        </div>

    )

}