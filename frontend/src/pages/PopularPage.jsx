import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import ReactCountryFlag from 'react-country-flag'
import { fetchCountry } from '../api/countries'
import { useProfileStore } from '../store/useProfileStore'
import { PROFILES } from '../utils/constants'
import { resolveVisaStatus } from '../utils/visaHelpers'
import VisaBadge from '../components/ui/VisaBadge'
import { MapPin, ArrowRight } from 'lucide-react'

// Curated list of popular destinations for Nepal passport holders
const POPULAR = [
  { code: 'IN', why: 'Open border — no visa ever needed' },
  { code: 'AE', why: 'Free visa on arrival, very accessible' },
  { code: 'TH', why: 'Visa on arrival, popular with Nepali travelers' },
  { code: 'SG', why: 'Easier access with US, UK or AU residency' },
  { code: 'JP', why: 'Top wishlist destination' },
  { code: 'GB', why: 'Popular destination, visa required' },
  { code: 'AU', why: 'Large Nepali diaspora' },
  { code: 'US', why: 'Home country if you hold a US Green Card' },
  { code: 'FR', why: 'Gateway to Europe/Schengen' },
  { code: 'MX', why: 'Visa-free with US Green Card' },
]

function PopularCard({ code, why }) {
  const activeProfile = useProfileStore(s => s.activeProfile)
  const { data: country } = useQuery({
    queryKey: ['country', code],
    queryFn: () => fetchCountry(code),
    staleTime: 1000 * 60 * 60,
    networkMode: 'offlineFirst',
  })

  if (!country) {
    return (
      <div className="animate-pulse bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 h-28" />
    )
  }

  const visaInfo = resolveVisaStatus(country, activeProfile)

  return (
    <Link
      to={`/country/${country.code}`}
      className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all group"
    >
      <ReactCountryFlag countryCode={country.code} svg style={{ width: '2.5rem', height: '2.5rem' }} className="flex-shrink-0 rounded-sm" />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {country.name}
          </h3>
          <VisaBadge status={visaInfo?.status} />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-1">
          <MapPin className="w-3 h-3" />
          {country.region}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 italic">{why}</p>
      </div>
      <ArrowRight className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-blue-500 flex-shrink-0 transition-colors" />
    </Link>
  )
}

export default function PopularPage() {
  const activeProfile = useProfileStore(s => s.activeProfile)
  const profileLabel = PROFILES.find(p => p.key === activeProfile)?.label ?? activeProfile

  return (
    <div className="space-y-5 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Popular Destinations</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Frequently visited countries — requirements shown for{' '}
          <span className="font-medium text-blue-600 dark:text-blue-400">{profileLabel}</span>.
          Switch your profile in the header to see how it changes.
        </p>
      </div>

      <div className="space-y-3">
        {POPULAR.map(({ code, why }) => (
          <PopularCard key={code} code={code} why={why} />
        ))}
      </div>

      <div className="text-center pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-medium"
        >
          Browse all 195+ countries →
        </Link>
      </div>
    </div>
  )
}
