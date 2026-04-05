export default function StatusBadge({ status }) {
    const colors = {
        'Applied': '#6c757d',
        'Phone Screen': '#0d6efd',
        'Interview': '#fd7e14',
        'Offer': '#198754',
        'Rejected': '#dc3545',
        'Withdrawn': '#adb5bd',
    }


    const backgroundColor = colors[status] || '#6c757d'

    return (
        <span style={{
            backgroundColor,
            color: 'white',
            padding: '2px 10px',
            borderRadius: '12px',
            fontSize: '0.85rem',
            fontWeight: 'bold',
        }}>
            {status}
        </span>
    )
}