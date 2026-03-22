import { useMemo, useState, useRef, useEffect } from 'react'
import { Filter, X, ChevronDown, Check } from 'lucide-react'
import ProfileFlag from '../components/ui/ProfileFlag'
import CountrySearch from '../components/countries/CountrySearch'
import RegionFilter from '../components/countries/RegionFilter'
import StatusFilter from '../components/countries/StatusFilter'
import CountryCard from '../components/countries/CountryCard'
import LoadingSpinner, { CardSkeleton } from '../components/ui/LoadingSpinner'
import Disclaimer from '../components/ui/Disclaimer'
import { useCountries } from '../hooks/useCountries'
import { useFilterStore } from '../store/useFilterStore'
import { useProfileStore } from '../store/useProfileStore'
import { PROFILES } from '../utils/constants'

function InlineProfileDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const activeProfile = useProfileStore(s => s.activeProfile)
  const setProfile = useProfileStore(s => s.setProfile)
  const current = PROFILES.find(p => p.key === activeProfile) ?? PROFILES[0]

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="inline-flex items-center gap-1.5 font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
      >
        <ProfileFlag codes={current.codes} />
        <span>{current.label}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
          <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-700">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Travel Documents
            </p>
          </div>
          {PROFILES.map(profile => (
            <button
              key={profile.key}
              onClick={() => { setProfile(profile.key); setOpen(false) }}
              className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
            >
              <ProfileFlag codes={profile.codes} size="1.5rem" />
              <span className="flex-1 text-sm text-gray-800 dark:text-gray-200">{profile.label}</span>
              {activeProfile === profile.key && (
                <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function HomePage() {
  const { data: countries, isLoading, isError } = useCountries()
  const { searchQuery, selectedRegion, selectedStatuses, clearFilters } = useFilterStore()

  const hasFilters = searchQuery || selectedRegion || selectedStatuses.length > 0

  const stats = useMemo(() => {
    if (!countries) return null
    const counts = {}
    countries.forEach(c => { counts[c.visa_status] = (counts[c.visa_status] || 0) + 1 })
    return counts
  }, [countries])

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Where can I go?</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1 flex-wrap">
          Showing requirements for <InlineProfileDropdown />
        </div>
      </div>

      {/* Stats bar */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { key: 'visa_free',       label: 'Visa Free',     color: 'text-green-600 dark:text-green-400' },
            { key: 'visa_on_arrival', label: 'On Arrival',    color: 'text-teal-600 dark:text-teal-400' },
            { key: 'e_visa',          label: 'E-Visa',        color: 'text-blue-600 dark:text-blue-400' },
            { key: 'visa_required',   label: 'Visa Required', color: 'text-red-600 dark:text-red-400' },
          ].map(({ key, label, color }) => (
            <div key={key} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3 text-center">
              <p className={`text-2xl font-bold ${color}`}>{stats[key] || 0}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      )}

      <Disclaimer />

      {/* Search & Filters */}
      <div className="space-y-3">
        <CountrySearch />
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide flex items-center gap-1.5">
            <Filter className="w-3 h-3" />
            Filter by Region
          </p>
          <RegionFilter />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide flex items-center gap-1.5">
            <Filter className="w-3 h-3" />
            Filter by Visa Status
          </p>
          <StatusFilter />
        </div>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <X className="w-4 h-4" />
            Clear all filters
          </button>
        )}
      </div>

      {/* Results */}
      {isLoading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      )}

      {isError && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p className="text-lg font-medium">Could not load countries</p>
          <p className="text-sm mt-1">Make sure the backend server is running on port 3001.</p>
        </div>
      )}

      {!isLoading && !isError && countries && (
        <>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {countries.length} {countries.length === 1 ? 'country' : 'countries'}
            {hasFilters ? ' matched' : ' total'}
          </p>
          {countries.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-medium">No countries found</p>
              <p className="text-sm mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {countries.map(country => (
                <CountryCard key={country.code} country={country} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
