import { TRAVEL_STATUSES } from '../../utils/constants'
import { useAllTravelList, useAddToTravelList, useRemoveFromTravelList } from '../../hooks/useTravelList'

export default function StatusPicker({ countryCode }) {
  const { data: travelList } = useAllTravelList()
  const addMutation = useAddToTravelList()
  const removeMutation = useRemoveFromTravelList()

  const entry = travelList?.find(e => e.country_code === countryCode)

  function handleClick(status) {
    if (entry?.status === status) {
      removeMutation.mutate(countryCode)
    } else {
      addMutation.mutate({ country_code: countryCode, status })
    }
  }

  return (
    <div>
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">My Travel List</p>
      <div className="flex gap-2 flex-wrap">
        {TRAVEL_STATUSES.map(({ key, label, emoji, color }) => (
          <button
            key={key}
            onClick={() => handleClick(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all text-sm font-medium ${
              entry?.status === key
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <span>{emoji}</span>
            <span>{label}</span>
          </button>
        ))}
        {entry && (
          <button
            onClick={() => removeMutation.mutate(countryCode)}
            className="px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-red-300 dark:hover:border-red-700 hover:text-red-600 dark:hover:text-red-400 text-sm transition-all"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  )
}
