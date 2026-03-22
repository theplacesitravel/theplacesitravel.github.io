import { getStatusColors, getStatusLabel } from '../../utils/visaHelpers'

export default function VisaBadge({ status, size = 'sm' }) {
  const colors = getStatusColors(status)
  const label = getStatusLabel(status)

  const sizeClass = size === 'lg'
    ? 'px-3 py-1.5 text-sm font-semibold'
    : 'px-2 py-0.5 text-xs font-medium'

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full ${sizeClass} ${colors.bg} ${colors.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${colors.dot}`} />
      {label}
    </span>
  )
}
