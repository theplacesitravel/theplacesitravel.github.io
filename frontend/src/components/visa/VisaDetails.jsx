import { ExternalLink, Clock, CreditCard, Zap, Plane } from 'lucide-react'
import VisaBadge from '../ui/VisaBadge'
import { formatDuration } from '../../utils/visaHelpers'

export default function VisaDetails({ visaInfo, countryName }) {
  if (!visaInfo) return null
  const { status, visa_type, duration_days, notes, official_url, e_visa_available, voa_available, cost_usd } = visaInfo

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <VisaBadge status={status} size="lg" />
        {visa_type && (
          <span className="text-sm text-gray-600 dark:text-gray-400">{visa_type}</span>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {duration_days && (
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-1">
              <Clock className="w-3 h-3" />
              Max Stay
            </div>
            <p className="font-semibold text-sm">{formatDuration(duration_days)}</p>
          </div>
        )}
        {cost_usd !== undefined && cost_usd !== null && (
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-1">
              <CreditCard className="w-3 h-3" />
              Fee
            </div>
            <p className="font-semibold text-sm">{cost_usd === 0 ? 'Free' : `~$${cost_usd} USD`}</p>
          </div>
        )}
        {e_visa_available && (
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
            <div className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 mb-1">
              <Zap className="w-3 h-3" />
              E-Visa
            </div>
            <p className="font-semibold text-sm text-blue-700 dark:text-blue-300">Available</p>
          </div>
        )}
        {voa_available && (
          <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-3">
            <div className="flex items-center gap-1.5 text-xs text-teal-600 dark:text-teal-400 mb-1">
              <Plane className="w-3 h-3" />
              Visa on Arrival
            </div>
            <p className="font-semibold text-sm text-teal-700 dark:text-teal-300">Available</p>
          </div>
        )}
      </div>

      {notes && (
        <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
          {notes}
        </p>
      )}


      {official_url && (
        <a
          href={official_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-medium"
        >
          <ExternalLink className="w-4 h-4" />
          Verify on official site →
        </a>
      )}
    </div>
  )
}
