import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, MapPin } from 'lucide-react'
import ReactCountryFlag from 'react-country-flag'
import { useCountry } from '../hooks/useCountry'
import { useProfileStore } from '../store/useProfileStore'
import { PROFILES } from '../utils/constants'
import { resolveVisaStatus } from '../utils/visaHelpers'
import VisaDetails from '../components/visa/VisaDetails'
import VisaCompare from '../components/visa/VisaCompare'
import Disclaimer from '../components/ui/Disclaimer'
import LoadingSpinner from '../components/ui/LoadingSpinner'

export default function CountryPage() {
  const { code } = useParams()
  const { data: country, isLoading, isError } = useCountry(code?.toUpperCase())
  const activeProfile = useProfileStore(s => s.activeProfile)
  const profileLabel = PROFILES.find(p => p.key === activeProfile)?.label ?? activeProfile

  if (isLoading) return <LoadingSpinner text="Loading country..." />

  if (isError || !country) {
    return (
      <div className="text-center py-16">
        <p className="text-4xl mb-3">🌍</p>
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Country not found</p>
        <Link to="/" className="text-blue-600 dark:text-blue-400 text-sm mt-2 inline-block hover:underline">
          ← Back to browse
        </Link>
      </div>
    )
  }

  const visaInfo = resolveVisaStatus(country, activeProfile)

  return (
    <div className="space-y-6 max-w-3xl">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
        <ArrowLeft className="w-4 h-4" />
        Back to browse
      </Link>

      {/* Country header */}
      <div className="flex items-center gap-4">
        <ReactCountryFlag countryCode={country.code} svg style={{ width: '4rem', height: '4rem' }} className="rounded-sm" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{country.name}</h1>
          {country.capital && (
            <p className="text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mt-1">
              <MapPin className="w-4 h-4" />
              {country.capital} · {country.region}
            </p>
          )}
        </div>
      </div>

      {/* Active profile visa details */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
        <div>
          <h2 className="font-semibold text-gray-900 dark:text-gray-100">Visa Requirement</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            For <span className="font-medium text-blue-600 dark:text-blue-400">{profileLabel}</span>
          </p>
        </div>
        <VisaDetails visaInfo={visaInfo} countryName={country.name} />
      </section>

      {/* All profiles comparison */}
      <section className="space-y-3">
        <h2 className="font-semibold text-gray-900 dark:text-gray-100">All Profiles Comparison</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          How visa requirements change based on which documents you hold.
        </p>
        <VisaCompare country={country} />
      </section>

      <Disclaimer />
    </div>
  )
}
