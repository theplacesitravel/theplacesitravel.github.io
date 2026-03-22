import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Trash2, ExternalLink, MapPin } from 'lucide-react'
import { useTravelList, useRemoveFromTravelList } from '../hooks/useTravelList'
import VisaBadge from '../components/ui/VisaBadge'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { useProfileStore } from '../store/useProfileStore'
import { TRAVEL_STATUSES } from '../utils/constants'
import { resolveVisaStatus } from '../utils/visaHelpers'

const TABS = TRAVEL_STATUSES

export default function TravelListPage() {
  const [activeTab, setActiveTab] = useState('visited')
  const activeProfile = useProfileStore(s => s.activeProfile)
  const { data: entries, isLoading } = useTravelList(activeTab)
  const removeMutation = useRemoveFromTravelList()

  return (
    <div className="space-y-5 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">My Travel List</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Countries you've saved — click a country to view details.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
        {TABS.map(({ key, label, emoji }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === key
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            {emoji} {label}
          </button>
        ))}
      </div>

      {/* List */}
      {isLoading && <LoadingSpinner text="Loading your list..." />}

      {!isLoading && entries && entries.length === 0 && (
        <div className="text-center py-16 text-gray-400 dark:text-gray-500">
          <p className="text-4xl mb-3">{TABS.find(t => t.key === activeTab)?.emoji}</p>
          <p className="font-medium text-gray-600 dark:text-gray-400">
            No {activeTab} countries yet
          </p>
          <p className="text-sm mt-1">
            <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline">
              Browse countries
            </Link>{' '}
            and add them here.
          </p>
        </div>
      )}

      {!isLoading && entries && entries.length > 0 && (
        <div className="space-y-3">
          {entries.map(entry => {
            const country = entry.country
            if (!country) return null
            const visaInfo = resolveVisaStatus(
              { visa_requirements: entry.visa_requirements },
              activeProfile
            )

            return (
              <div
                key={entry.country_code}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-4"
              >
                <Link to={`/country/${entry.country_code}`} className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="text-3xl flex-shrink-0">{country.flag_emoji}</span>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-gray-100 truncate hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {country.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      {country.region}
                      {country.capital && ` · ${country.capital}`}
                    </p>
                  </div>
                </Link>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link to={`/country/${entry.country_code}`}>
                    <ExternalLink className="w-4 h-4 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" />
                  </Link>
                  <button
                    onClick={() => removeMutation.mutate(entry.country_code)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    title="Remove from list"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
