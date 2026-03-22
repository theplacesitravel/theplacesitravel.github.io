import { STATUS_COLORS, VISA_STATUSES } from './constants'

export function resolveVisaStatus(country, profile) {
  return country?.visa_requirements?.[profile] ?? { status: 'unknown' }
}

export function getStatusColors(status) {
  return STATUS_COLORS[status] ?? STATUS_COLORS.unknown
}

export function getStatusLabel(status) {
  return VISA_STATUSES.find(s => s.key === status)?.label ?? status ?? 'Unknown'
}

export function formatDuration(days) {
  if (!days) return null
  if (days >= 365) return `${Math.round(days / 365)} year${days >= 730 ? 's' : ''}`
  if (days >= 30) return `${Math.round(days / 30)} month${days >= 60 ? 's' : ''}`
  return `${days} days`
}
