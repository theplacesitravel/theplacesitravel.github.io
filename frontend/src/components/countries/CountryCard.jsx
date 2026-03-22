import { Link } from 'react-router-dom'
import { MapPin, Clock, Zap } from 'lucide-react'
import ReactCountryFlag from 'react-country-flag'
import VisaBadge from '../ui/VisaBadge'
import { formatDuration } from '../../utils/visaHelpers'

export default function CountryCard({ country }) {
  return (
    <Link
      to={`/country/${country.code}`}
      className="block bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all group"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <ReactCountryFlag countryCode={country.code} svg style={{ width: '2rem', height: '2rem' }} className="flex-shrink-0 rounded-sm" />
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {country.name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {country.region}
            </p>
          </div>
        </div>
        <VisaBadge status={country.visa_status} />
      </div>

      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
        {country.duration_days && (
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Up to {formatDuration(country.duration_days)}
          </span>
        )}
        {country.e_visa_available && (
          <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
            <Zap className="w-3 h-3" />
            E-Visa
          </span>
        )}
      </div>
    </Link>
  )
}
