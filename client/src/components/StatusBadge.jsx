export default function StatusBadge({ status }) {
    const badgeClass = {
      'Applied': 'badge badge-applied',
      'Phone Screen': 'badge badge-phone',
      'Interview': 'badge badge-interview',
      'Offer': 'badge badge-offer',
      'Rejected': 'badge badge-rejected',
      'Withdrawn': 'badge badge-withdrawn',
    }
  
    return (
      <span className={badgeClass[status] || 'badge badge-applied'}>
        {status}
      </span>
    )
  }