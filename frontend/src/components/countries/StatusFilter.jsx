import { VISA_STATUSES } from '../../utils/constants'
import { useFilterStore } from '../../store/useFilterStore'

export default function StatusFilter() {
  const { selectedStatuses, toggleStatus } = useFilterStore()

  return (
    <div className="flex gap-2 flex-wrap">
      {VISA_STATUSES.map(({ key, label }) => {
        const active = selectedStatuses.includes(key)
        return (
          <button
            key={key}
            onClick={() => toggleStatus(key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
              active
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
