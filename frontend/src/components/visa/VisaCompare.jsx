import { ExternalLink } from 'lucide-react'
import VisaBadge from '../ui/VisaBadge'
import ProfileFlag from '../ui/ProfileFlag'
import { PROFILES } from '../../utils/constants'
import { formatDuration } from '../../utils/visaHelpers'
import { useProfileStore } from '../../store/useProfileStore'

export default function VisaCompare({ country }) {
  const activeProfile = useProfileStore(s => s.activeProfile)

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <th className="text-left px-4 py-3 font-semibold text-gray-700 dark:text-gray-300 min-w-36">
              Travel Documents
            </th>
            <th className="text-left px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Status</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-700 dark:text-gray-300 hidden sm:table-cell">
              Max Stay
            </th>
            <th className="text-left px-4 py-3 font-semibold text-gray-700 dark:text-gray-300 hidden md:table-cell">
              Notes
            </th>
            <th className="text-left px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Verify</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
          {PROFILES.map(profile => {
            const req = country.visa_requirements?.[profile.key]
            const isActive = profile.key === activeProfile

            return (
              <tr
                key={profile.key}
                className={`transition-colors ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/20'
                    : 'bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <ProfileFlag codes={profile.codes} size="1.25rem" />
                    <div>
                      <p className={`font-medium text-xs ${isActive ? 'text-blue-700 dark:text-blue-300' : 'text-gray-800 dark:text-gray-200'}`}>
                        {profile.label}
                        {isActive && <span className="ml-1 text-blue-500">(active)</span>}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  {req ? (
                    <div className="space-y-1">
                      <VisaBadge status={req.status} />
                    </div>
                  ) : (
                    <span className="text-gray-400 text-xs">No data</span>
                  )}
                </td>
                <td className="px-4 py-3 hidden sm:table-cell text-gray-600 dark:text-gray-400 text-xs">
                  {req?.duration_days ? formatDuration(req.duration_days) : '—'}
                </td>
                <td className="px-4 py-3 hidden md:table-cell text-gray-600 dark:text-gray-400 text-xs max-w-xs">
                  {req?.notes ?? '—'}
                </td>
                <td className="px-4 py-3">
                  {req?.official_url ? (
                    <a
                      href={req.official_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                      title="Verify on official site"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : '—'}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
